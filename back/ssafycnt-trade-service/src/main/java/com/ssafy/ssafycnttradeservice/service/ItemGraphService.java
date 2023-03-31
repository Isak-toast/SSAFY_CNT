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
public class ItemGraphService {
    @PersistenceContext
    private EntityManager em;


    public Map<String, Object> findOneRowPerItem(String item, String startDate, String endDate) {
        Map<String, Object> map = new HashMap<>();
        String itemSubStr4 = item.substring(0, 4);
        startDate = Change(startDate);
        endDate = Change(endDate);
        String sql = null;
        if(item.equals("000000")) {
            sql = "select * from " + "ALL_trading" + " where year between " +
                    startDate + " and " + endDate;
        } else {
            sql = "select * from " + "ALL_trading" + " where year between " +
                    startDate + " and " + endDate + " and hscd = " + item;
        }
        List<Object[]> list = em.createNativeQuery(sql).getResultList();
        Long expDlrSum = 0L;
        Long impDlrSum = 0L;
        Long balpaymentsDlr = 0L;
        Long expWgtSum = 0L;
        Long impWgtSum = 0L;
        Long balpaymentsWgt = 0L;
        for(int i=0;i<list.size();i++) {
            Graph temp = new Graph(list.get(i));
            expDlrSum += temp.getExpdlr();
            impDlrSum += temp.getImpdlr();
            balpaymentsDlr += temp.getBalpayments();
            expWgtSum += temp.getExpwgt();
            impWgtSum += temp.getImpwgt();
            balpaymentsWgt += temp.getImpwgt()-temp.getExpwgt();
        }
        map.put("itemName",CdConstants.HSCDS.get(itemSubStr4));
        map.put("period", startDate+" ~ "+endDate);
        map.put("expdlrSum",expDlrSum);
        map.put("impdlrSum",impDlrSum);
        map.put("balpaymentsDlr",balpaymentsDlr);
        map.put("expwgtSum",expWgtSum);
        map.put("impwgtSum",impWgtSum);
        map.put("balpaymentsWgt",balpaymentsWgt);
        return map;
    }

    public List<Map<String, Object>> findThreeRowPerItem(String startDate, String endDate) {
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

    public Map<String, Object> findZeroRowPerItem(String item, String startDate, String endDate) {
        startDate = Change(startDate);
        endDate = Change(endDate);
        Map<String, Object> map = new HashMap<>();
        for(String key : CdConstants.STATCDS.keySet()) {
            Map<String, Object> mapPerStat = new HashMap<>();
            if (key.equals("ALL")) continue;
            String tableName = key + "_trading";
            String sql = "select * from " + tableName + " where year between " +
                    startDate + " and " + endDate + " and hscd like " + item;
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

    private Map<String, Object> makeImportDetail(Long totalImpDlrSum, Long totalImpWgtSum, String startDate, String endDate) {
        Map<String, Object> importDetail = new HashMap<>();
        for(String key : CdConstants.HSCDS.keySet()) {
            Map<String, Object> importDetailPerItem = new HashMap<>();
            if (key.equals("0000")) continue;
            String sql = "select * from " + "ALL_trading" + " where year between " +
                    startDate + " and " + endDate + " and hscd like '" + key+"%'";
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
            importDetailPerItem.put("itemName",CdConstants.HSCDS.get(key));
            importDetailPerItem.put("impdlrSum",impdlrSum);
            importDetailPerItem.put("impdlrRatio",impdlrRatio);
            importDetailPerItem.put("impwgtSum",impwgtSum);
            importDetailPerItem.put("impwgtRatio",impwgtRatio);
            importDetail.put(key,importDetailPerItem);
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
        for(String key : CdConstants.HSCDS.keySet()) {
            Map<String, Object> exportDetailPerItem = new HashMap<>();
            if (key.equals("0000")) continue;
            String sql = "select * from " + "ALL_trading" + " where year between " +
                    startDate + " and " + endDate + " and hscd like '" + key+"%'";
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
            exportDetailPerItem.put("itemName",CdConstants.HSCDS.get(key));
            exportDetailPerItem.put("expdlrSum",expdlrSum);
            exportDetailPerItem.put("expdlrRatio",expdlrRatio);
            exportDetailPerItem.put("expwgtSum",expwgtSum);
            exportDetailPerItem.put("expwgtRatio",expwgtRatio);
            exportDetail.put(key,exportDetailPerItem);
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
