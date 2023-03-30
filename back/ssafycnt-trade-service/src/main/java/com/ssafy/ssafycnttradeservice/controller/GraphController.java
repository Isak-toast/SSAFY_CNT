package com.ssafy.ssafycnttradeservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.dto.response.Row1ResponseDTO;
import com.ssafy.ssafycnttradeservice.dto.response.Row2ResponseDTO;
import com.ssafy.ssafycnttradeservice.service.GraphService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class GraphController {
    private final GraphService graphService;

    @GetMapping("/trade/onerow")
    public ResponseEntity<?> searchOneRow(@RequestParam String statCd, @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        List<Graph> list = graphService.findOneRow(statCd,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(new Row1ResponseDTO(list,statCd,startDate,endDate));
    }

    @GetMapping("/trade/tworow")
    public ResponseEntity<?> searchTwoRow(@RequestParam String statCd, @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        List<Map<String, Object>> list = graphService.findTwoRow(statCd,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(new Row2ResponseDTO(list,statCd,startDate,endDate));
    }

    private String Change(String Date) {
        String year = Date.substring(0,4);
        String month = Date.substring(4,6);
        String result = year+"."+month;
        return result;
    }
}
