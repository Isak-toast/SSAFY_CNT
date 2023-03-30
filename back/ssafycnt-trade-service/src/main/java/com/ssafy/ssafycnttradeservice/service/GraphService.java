package com.ssafy.ssafycnttradeservice.service;

import com.ssafy.ssafycnttradeservice.domain.Graph;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.swing.event.ChangeEvent;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GraphService {
    @PersistenceContext
    private EntityManager em;
    public List<Graph> findDataByCountry(String statCd, String startDate, String endDate) {
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

    private String Change(String Date) {
        String year = Date.substring(0,4);
        String month = Date.substring(4,6);
        String result = year+"."+month;
        return result;
    }
}
