package com.ssafy.ssafycnttradeservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.dto.request.Row1RequestDTO;
import com.ssafy.ssafycnttradeservice.dto.response.Row1ResponseDTO;
import com.ssafy.ssafycnttradeservice.service.GraphService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class GraphController {
    private final GraphService graphService;

    @GetMapping("/trade/onelow")
    public ResponseEntity<?> searchDataByCountry(@RequestParam String statCd, @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        List<Graph> list = graphService.findDataByCountry(statCd,startDate,endDate);
        return ResponseEntity.ok(new Row1ResponseDTO(list,statCd,startDate,endDate));
    }
}
