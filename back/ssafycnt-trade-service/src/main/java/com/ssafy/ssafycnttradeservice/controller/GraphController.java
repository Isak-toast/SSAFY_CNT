package com.ssafy.ssafycnttradeservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.dto.response.item.ItemRow1ResponseDTO;
import com.ssafy.ssafycnttradeservice.dto.response.item.ItemRow2ResponseDTO;
import com.ssafy.ssafycnttradeservice.dto.response.stat.StatRow1ResponseDTO;
import com.ssafy.ssafycnttradeservice.dto.response.stat.StatRow2ResponseDTO;
import com.ssafy.ssafycnttradeservice.dto.response.stat.StatRow3ResponseDTO;
import com.ssafy.ssafycnttradeservice.service.ItemGraphService;
import com.ssafy.ssafycnttradeservice.service.StatGraphService;
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
@CrossOrigin(origins = {"https://ssafycnt.site", "http://localhost:5173" })
public class GraphController {
    private final StatGraphService statGraphService;
    private final ItemGraphService itemGraphService;

    @GetMapping("/trade/onerow")
    public ResponseEntity<?> searchOneRowPerStat(@RequestParam String statCd, @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        List<Graph> list = statGraphService.findOneRowPerStat(statCd,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(new StatRow1ResponseDTO(list,statCd,startDate,endDate));
    }

    @GetMapping("/trade/tworow")
    public ResponseEntity<?> searchTwoRowPerStat(@RequestParam String statCd, @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        List<Map<String, Object>> list = statGraphService.findTwoRowPerStat(statCd,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(new StatRow2ResponseDTO(list,statCd,startDate,endDate));
    }

    @GetMapping("/trade/threerow")
    public ResponseEntity<?> searchThreeRowPerStat(@RequestParam String startDate, @RequestParam String endDate) throws JsonProcessingException {
        List<Map<String, Object>> list = statGraphService.findThreeRowPerStat(startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(new StatRow3ResponseDTO(list,startDate,endDate));
    }

    @GetMapping("/trade/zerorow")
    public ResponseEntity<?> searchZeroRowPerStat(@RequestParam String startDate, @RequestParam String endDate) throws JsonProcessingException {
        Map<String, Object> list = statGraphService.findZeroRowPerStat(startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/trade/item/onerow")
    public ResponseEntity<?> searchOneRowPerItem(@RequestParam String item,
                                                 @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        Map<String, Object> list = itemGraphService.findOneRowPerItem(item,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/trade/item/tworow")
    public ResponseEntity<?> searchTwoRowPerItem(@RequestParam String item,
                                                 @RequestParam String startDate,
                                                 @RequestParam String endDate) throws JsonProcessingException {
        List<Map<String, Object>> list = itemGraphService.findTwoRowPerItem(item,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        item = item.substring(0,4);
        return ResponseEntity.ok(new ItemRow2ResponseDTO(list,item,startDate,endDate));
    }

    @GetMapping("/trade/item/threerow")
    public ResponseEntity<?> searchThreeRowPerItem(@RequestParam String item,
                                                   @RequestParam String startDate,
                                                   @RequestParam String endDate) throws JsonProcessingException {
        List<Map<String, Object>> list = itemGraphService.findThreeRowPerItem(item,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(new ItemRow1ResponseDTO(list,startDate,endDate));
    }

    @GetMapping("/trade/item/zerorow")
    public ResponseEntity<?> searchZeroRowPerITem(@RequestParam String item,
                                                  @RequestParam String startDate,
                                                  @RequestParam String endDate) throws JsonProcessingException {
        Map<String, Object> list = itemGraphService.findZeroRowPerItem(item,startDate,endDate);
        startDate = Change(startDate);
        endDate = Change(endDate);
        return ResponseEntity.ok(list);
    }

    private String Change(String Date) {
        String year = Date.substring(0,4);
        String month = Date.substring(4,6);
        String result = year+"."+month;
        return result;
    }
}
