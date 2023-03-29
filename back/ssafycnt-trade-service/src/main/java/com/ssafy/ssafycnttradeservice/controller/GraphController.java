package com.ssafy.ssafycnttradeservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.dto.response.Row1ResponseDTO;
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

    @GetMapping("/trade/onelow")
    public ResponseEntity<?> searchOneLowData(@RequestParam String statCd, @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        List<Graph> list = graphService.findOneLowData(statCd,startDate,endDate);
        return ResponseEntity.ok(new Row1ResponseDTO(list,statCd,startDate,endDate));
    }
    @GetMapping("trade/twolow")
    public ResponseEntity<?> searchTwoLowData(@RequestParam String statCd, @RequestParam String startDate,
                                              @RequestParam String endDate) {
        Map<String, Object> expdlrChange = graphService.findTwoLowData(statCd,startDate,endDate);
        return ResponseEntity.ok(null);
    }
}
