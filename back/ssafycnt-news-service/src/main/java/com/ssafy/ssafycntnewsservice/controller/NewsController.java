package com.ssafy.ssafycntnewsservice.controller;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;
import com.ssafy.ssafycntnewsservice.service.MiningService;
import com.ssafy.ssafycntnewsservice.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://ssafycnt.site", "http://localhost:5173" })
public class NewsController {
    private final NewsService newsService;
    private final MiningService miningService;
    @GetMapping("/news")
    public List<NewsDto> NewsCrawling(@RequestParam String country, String item, String startDate, String endDate) {
        return newsService.getNewsData(country, item, startDate, endDate);
    }
    @GetMapping("/news/mining")
    public Map<String, List<NewsDto>> TextMining(@RequestParam String country, String item, String startDate, String endDate) {
        List<NewsDto> newsdata = newsService.getNewsData(country, item, startDate, endDate);
        return miningService.getMiningData(newsdata);
    }
}
