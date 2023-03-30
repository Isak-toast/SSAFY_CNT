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

    private Map<String, Object> makeImportTop(List<Graph> list) {
        return null;
    }

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
        return exportTop;
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
}
