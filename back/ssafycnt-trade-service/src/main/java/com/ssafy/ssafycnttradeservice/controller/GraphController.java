package com.ssafy.ssafycnttradeservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.dto.ByCountryRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class GraphController {
    @PersistenceContext
    private EntityManager em;

    @PostMapping("/trade/country")
    public ResponseEntity<?> searchDataByCountry(@RequestBody ByCountryRequestDTO dto) throws JsonProcessingException {
          String tableName = dto.getStatCd()+"_trading";
          String sql = "select * from " + tableName + " where year between " +
                  dto.getStartDate() + " and " + dto.getEndDate();
        List<Graph> resultDtos = (List<Graph>) em.createNativeQuery(sql).getResultList();
//        ObjectMapper mapper = new ObjectMapper();
//        List<String> jsonString = new ArrayList<>();
//        for(Graph g : resultDtos) {
//            jsonString.add(mapper.writeValueAsString(g));
//        }
//        List<Graph> resultDtos= nativeQuery.getResultList();
        return ResponseEntity.ok(resultDtos);
    }
}
