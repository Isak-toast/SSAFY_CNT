package com.ssafy.ssafycnttradeservice.service;

import com.ssafy.ssafycnttradeservice.constants.CdConstants;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class GraphService {
    @PersistenceContext
    private EntityManager em;
    public List<Graph> findOneRow(String statCd, String startDate, String endDate) {
        startDate = Change(startDate);
        endDate = Change(endDate);
        String tableName = statCd+"_trading";
        String sql = "select * from " + tableName + " where year between " +
                startDate + " and " + endDate;
        List<Object[]> list = em.createNativeQuery(sql).getResultList();
        List<Graph> resultDtos = new ArrayList<>();
        for(int i=0;i< list.size();i++) {
            resultDtos.add(new Graph(list.get(i)));
        }
        return resultDtos;
    }

    public List<Map<String, Object>> findTwoRow(String statCd, String startDate, String endDate) {
        startDate = ChangeMinusOneMonth(startDate);
        endDate = Change(endDate);
        String tableName = statCd+"_trading";
        String sql = "select * from " + tableName + " where year between " +
                startDate + " and " + endDate;
        List<Object[]> list = em.createNativeQuery(sql).getResultList();
        List<Graph> resultDtos = new ArrayList<>();
        for(int i=0;i< list.size();i++) {
            resultDtos.add(new Graph(list.get(i)));
        }
        Map<String, Object> expdlrChange = MakeExpDlrChange(resultDtos);
        Map<String, Object> exportTop = makeExportTop(resultDtos);
        Map<String, Object> importTop = makeImportTop(resultDtos);
        return Arrays.asList(expdlrChange,exportTop,importTop);
    }

    private String Change(String Date) {
        String year = Date.substring(0,4);
        String month = Date.substring(4,6);
        String result = year+"."+month;
        return result;
    }

    private String ChangeMinusOneMonth(String Date) {
        Integer year = Integer.parseInt(Date.substring(0,4));
        Integer month = Integer.parseInt(Date.substring(4,6));
        month -= 1;
        if(month==0) {
            year -= 1;
            month = 12;
        }
        String yearStr = year.toString();
        String monthStr = month.toString();
        if(monthStr.length()==1) monthStr = new String("0"+monthStr);
        String result = yearStr+"."+monthStr;
        return result;
    }

    private List<Long> IncreaseGraph(Map<String, Object> map) {
        List<Long> changeRate = new ArrayList<>();
        Long prev = null;
        Long now = null;
        String firstYear = null;
        for(String key : map.keySet()) {
            now = (Long) map.get(key);
            if(prev!=null)  {
                Long diff = (now-prev)*100;
                if(prev!=0) diff/=prev;
                else diff = 100L;
                changeRate.add(diff);
            } else {
                firstYear = key;
            }
            prev = now;
        }
        return changeRate;
    }

    // export start

    private Map<String, Object> makeExportTop(List<Graph> list) {
        Map<String, Object> exportTop = new HashMap<>();
        Map<String, TreeMap<String, Object>> exportChange = new HashMap<>();
        Map<String, Long> expdlrSum = new HashMap<>();
        for(Graph g : list) {
            String hscd = g.getHscd().substring(0,4);
            String year = g.getYear();
            Long expDlr = g.getExpdlr();
            TreeMap<String, Object> hscdMap = exportChange.getOrDefault(hscd, new TreeMap<String, Object>());
            Long x = (Long) hscdMap.getOrDefault(year, 0L) + expDlr;
            hscdMap.put(year,x);
            exportChange.put(hscd,hscdMap);
        }
        for(String key : exportChange.keySet()) {
            TreeMap<String, Object> hscdMap = exportChange.get(key);
            List<Long> changeRate = IncreaseGraph(hscdMap);
            hscdMap.remove(hscdMap.firstKey());
            Long sum = MakeExpDlrSum(hscdMap);
            expdlrSum.put(key,sum);
            hscdMap.put("changeRate",changeRate);
        }
        for(String key : exportChange.keySet()) {
            String hscd = key;
            Map<String,Object> map = new HashMap<>();
            map.put("expdlrSum",expdlrSum.get(hscd));
            map.put("exportChange",exportChange.get(hscd));
            exportTop.put(CdConstants.HSCDS.get(hscd),map);
        }
        List<Map.Entry<String,Object>> resultDtos = new LinkedList<>(exportTop.entrySet());
        resultDtos.sort(new Comparator<Map.Entry<String, Object>>() {
            @Override
            public int compare(Map.Entry<String, Object> o1, Map.Entry<String, Object> o2) {
                Map<String, Object> hscdList1 = (Map<String, Object>)o1.getValue();
                Long cost1 = (Long) hscdList1.get("expdlrSum");
                Map<String, Object> hscdList2 = (Map<String, Object>)o2.getValue();
                Long cost2 = (Long) hscdList2.get("expdlrSum");
                return cost1 < cost2 ? 1 : -1;
            }
        });
        Map<String, Object> sortedexportTop = new LinkedHashMap<>();
        for(Map.Entry<String, Object> entry : resultDtos) {
            sortedexportTop.put(entry.getKey(), entry.getValue());
            if(sortedexportTop.size()==5) break;
        }
        return sortedexportTop;
    }

    private Map<String, Object> MakeExpDlrChange(List<Graph> list) {
        TreeMap<String, Object> sumExpDlrPerYear = new TreeMap<>();
        for(Graph g : list) {
            String year = g.getYear();
            Long expDlr = g.getExpdlr();
            Long x = (Long) sumExpDlrPerYear.getOrDefault(year, 0L) + expDlr;
            sumExpDlrPerYear.put(year,x);
        }
        List<Long> changeRate = IncreaseGraph(sumExpDlrPerYear);
        sumExpDlrPerYear.remove(sumExpDlrPerYear.firstKey());
        sumExpDlrPerYear.put("changeRate",changeRate);
        return sumExpDlrPerYear;
    }

    private Long MakeExpDlrSum(Map<String, Object> map) {
        Long result = 0L;
        for(String key : map.keySet()) {
            result += (Long) map.get(key);
        }
        return result;
    }

    // export end

    // import start

    private Map<String, Object> makeImportTop(List<Graph> list) {
        Map<String, Object> importTop = new HashMap<>();
        Map<String, TreeMap<String, Object>> importChange = new HashMap<>();
        Map<String, Long> impdlrSum = new HashMap<>();
        for(Graph g : list) {
            String hscd = g.getHscd().substring(0,4);
            String year = g.getYear();
            Long impDlr = g.getImpdlr();
            TreeMap<String, Object> hscdMap = importChange.getOrDefault(hscd, new TreeMap<String, Object>());
            Long x = (Long) hscdMap.getOrDefault(year, 0L) + impDlr;
            hscdMap.put(year,x);
            importChange.put(hscd,hscdMap);
        }
        for(String key : importChange.keySet()) {
            TreeMap<String, Object> hscdMap = importChange.get(key);
            List<Long> changeRate = IncreaseGraph(hscdMap);
            hscdMap.remove(hscdMap.firstKey());
            Long sum = MakeImpDlrSum(hscdMap);
            impdlrSum.put(key,sum);
            hscdMap.put("changeRate",changeRate);
        }
        for(String key : importChange.keySet()) {
            String hscd = key;
            Map<String,Object> map = new HashMap<>();
            map.put("impdlrSum",impdlrSum.get(hscd));
            map.put("importChange",importChange.get(hscd));
            importTop.put(CdConstants.HSCDS.get(hscd),map);
        }
        List<Map.Entry<String,Object>> resultDtos = new LinkedList<>(importTop.entrySet());
        resultDtos.sort(new Comparator<Map.Entry<String, Object>>() {
            @Override
            public int compare(Map.Entry<String, Object> o1, Map.Entry<String, Object> o2) {
                Map<String, Object> hscdList1 = (Map<String, Object>)o1.getValue();
                Long cost1 = (Long) hscdList1.get("impdlrSum");
                Map<String, Object> hscdList2 = (Map<String, Object>)o2.getValue();
                Long cost2 = (Long) hscdList2.get("impdlrSum");
                return cost1 < cost2 ? 1 : -1;
            }
        });
        Map<String, Object> sortedimportTop = new LinkedHashMap<>();
        for(Map.Entry<String, Object> entry : resultDtos) {
            sortedimportTop.put(entry.getKey(), entry.getValue());
            if(sortedimportTop.size()==5) break;
        }
        return sortedimportTop;
    }

    private Map<String, Object> MakeImpDlrChange(List<Graph> list) {
        TreeMap<String, Object> sumImpDlrPerYear = new TreeMap<>();
        for(Graph g : list) {
            String year = g.getYear();
            Long impDlr = g.getImpdlr();
            Long x = (Long) sumImpDlrPerYear.getOrDefault(year, 0L) + impDlr;
            sumImpDlrPerYear.put(year,x);
        }
        List<Long> changeRate = IncreaseGraph(sumImpDlrPerYear);
        sumImpDlrPerYear.remove(sumImpDlrPerYear.firstKey());
        sumImpDlrPerYear.put("changeRate",changeRate);
        return sumImpDlrPerYear;
    }

    private Long MakeImpDlrSum(Map<String, Object> map) {
        Long result = 0L;
        for(String key : map.keySet()) {
            result += (Long) map.get(key);
        }
        return result;
    }

    // import end

    public List<Map<String, Object>> findThreeRow(String startDate, String endDate) {
        startDate = Change(startDate);
        endDate = Change(endDate);
        Long totalExpDlrSum = 0L;
        Long totalExpWgtSum = 0L;
        Long totalImpDlrSum = 0L;
        Long totalImpWgtSum = 0L;
        String Asql = "select * from " + "ALL_trading" + " where year between " +
                    startDate + " and " + endDate;
        List<Object[]> Alist = em.createNativeQuery(Asql).getResultList();
        for(int i=0;i< Alist.size();i++) {
            Graph temp = new Graph(Alist.get(i));
            totalExpDlrSum+=temp.getExpdlr();
            totalExpWgtSum+=temp.getExpwgt();
            totalImpDlrSum+=temp.getImpdlr();
            totalImpWgtSum+=temp.getImpwgt();
        }
        Map<String, Object> exportDetail = makeExportDetail(totalExpDlrSum,totalExpWgtSum,startDate,endDate);
        Map<String, Object> importDetail = makeImportDetail(totalImpDlrSum,totalImpWgtSum,startDate,endDate);
        return Arrays.asList(exportDetail,importDetail);
    }

    public Map<String, Object> findFourRow(String startDate, String endDate) {
        startDate = Change(startDate);
        endDate = Change(endDate);
        Map<String, Object> map = new HashMap<>();
        for(String key : CdConstants.STATCDS.keySet()) {
            Map<String, Object> mapPerStat = new HashMap<>();
            if (key.equals("ALL")) continue;
            String tableName = key + "_trading";
            String sql = "select * from " + tableName + " where year between " +
                    startDate + " and " + endDate;
            List<Object[]> list = em.createNativeQuery(sql).getResultList();
            Long balpaymentsDlr = 0L;
            Long expDlrSum = 0L;
            Long impDlrSum = 0L;
            for (int i = 0; i < list.size(); i++) {
                Graph temp = new Graph(list.get(i));
                balpaymentsDlr+=temp.getBalpayments();
                expDlrSum+=temp.getExpdlr();
                impDlrSum+=temp.getImpdlr();
            }
            if(expDlrSum==0&&impDlrSum==0) continue;
            mapPerStat.put("nationName",CdConstants.STATCDS.get(key));
            mapPerStat.put("balpaymentsDlr",balpaymentsDlr);
            map.put(key,mapPerStat);
        }
        return map;
    }

    private Map<String, Object> makeImportDetail(Long totalImpDlrSum, Long totalImpWgtSum, String startDate, String endDate) {
        Map<String, Object> importDetail = new HashMap<>();
        for(String key : CdConstants.STATCDS.keySet()) {
            Map<String, Object> importDetailPerStat = new HashMap<>();
            if (key.equals("ALL")) continue;
            String tableName = key + "_trading";
            String sql = "select * from " + tableName + " where year between " +
                    startDate + " and " + endDate;
            List<Object[]> list = em.createNativeQuery(sql).getResultList();
            Long impdlrSum = 0L;
            Double impdlrRatio = null;
            Long impwgtSum = 0L;
            Double impwgtRatio = null;
            for (int i = 0; i < list.size(); i++) {
                Graph temp = new Graph(list.get(i));
                impdlrSum+=temp.getImpdlr();
                impwgtSum+=temp.getImpwgt();
            }
            if(impdlrSum==0L) continue;
            impdlrRatio = impdlrSum.doubleValue()*100/totalImpDlrSum;
            impwgtRatio = impwgtSum.doubleValue()*100/totalImpWgtSum;
            importDetailPerStat.put("nationName",CdConstants.STATCDS.get(key));
            importDetailPerStat.put("impdlrSum",impdlrSum);
            importDetailPerStat.put("impdlrRatio",impdlrRatio);
            importDetailPerStat.put("impwgtSum",impwgtSum);
            importDetailPerStat.put("impwgtRatio",impwgtRatio);
            importDetailPerStat.put("hsCode","전체품목");
            importDetail.put(key,importDetailPerStat);
        }
        List<Map.Entry<String, Object>> resultDtos = new LinkedList<>(importDetail.entrySet());
        resultDtos.sort(new Comparator<Map.Entry<String, Object>>() {
            @Override
            public int compare(Map.Entry<String, Object> o1, Map.Entry<String, Object> o2) {
                Map<String, Object> hscdList1 = (Map<String, Object>)o1.getValue();
                Long cost1 = (Long) hscdList1.get("impdlrSum");
                Map<String, Object> hscdList2 = (Map<String, Object>)o2.getValue();
                Long cost2 = (Long) hscdList2.get("impdlrSum");
                return cost1 < cost2 ? 1 : -1;
            }
        });
        Map<String, Object> sortedImportDetail = new LinkedHashMap<>();
        int idx = 1;
        for(Map.Entry<String, Object> entry : resultDtos) {
            Map<String, Object> value = (Map<String, Object>)entry.getValue();
            value.put("ranking",idx++);
            sortedImportDetail.put(entry.getKey(), entry.getValue());
        }
        return sortedImportDetail;
    }

    private Map<String, Object> makeExportDetail(Long totalExpDlrSum, Long totalExpWgtSum, String startDate, String endDate) {
        Map<String, Object> exportDetail = new HashMap<>();
        for(String key : CdConstants.STATCDS.keySet()) {
            Map<String, Object> exportDetailPerStat = new HashMap<>();
            if (key.equals("ALL")) continue;
            String tableName = key + "_trading";
            String sql = "select * from " + tableName + " where year between " +
                    startDate + " and " + endDate;
            List<Object[]> list = em.createNativeQuery(sql).getResultList();
            Long expdlrSum = 0L;
            Double expdlrRatio = null;
            Long expwgtSum = 0L;
            Double expwgtRatio = null;
            for (int i = 0; i < list.size(); i++) {
                Graph temp = new Graph(list.get(i));
                expdlrSum+=temp.getExpdlr();
                expwgtSum+=temp.getExpwgt();
            }
            if(expdlrSum==0L) continue;
            expdlrRatio = expdlrSum.doubleValue()*100/totalExpDlrSum;
            expwgtRatio = expwgtSum.doubleValue()*100/totalExpWgtSum;
            exportDetailPerStat.put("nationName",CdConstants.STATCDS.get(key));
            exportDetailPerStat.put("expdlrSum",expdlrSum);
            exportDetailPerStat.put("expdlrRatio",expdlrRatio);
            exportDetailPerStat.put("expwgtSum",expwgtSum);
            exportDetailPerStat.put("expwgtRatio",expwgtRatio);
            exportDetailPerStat.put("hsCode","전체품목");
            exportDetail.put(key,exportDetailPerStat);
        }
        List<Map.Entry<String, Object>> resultDtos = new LinkedList<>(exportDetail.entrySet());
        resultDtos.sort(new Comparator<Map.Entry<String, Object>>() {
            @Override
            public int compare(Map.Entry<String, Object> o1, Map.Entry<String, Object> o2) {
                Map<String, Object> hscdList1 = (Map<String, Object>)o1.getValue();
                Long cost1 = (Long) hscdList1.get("expdlrSum");
                Map<String, Object> hscdList2 = (Map<String, Object>)o2.getValue();
                Long cost2 = (Long) hscdList2.get("expdlrSum");
                return cost1 < cost2 ? 1 : -1;
            }
        });
        Map<String, Object> sortedExportDetail = new LinkedHashMap<>();
        int idx = 1;
        for(Map.Entry<String, Object> entry : resultDtos) {
            Map<String, Object> value = (Map<String, Object>)entry.getValue();
            value.put("ranking",idx++);
            sortedExportDetail.put(entry.getKey(), entry.getValue());
        }
        return sortedExportDetail;
    }
}
