package com.ssafy.ssafycntnewsservice.controller;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;
import com.ssafy.ssafycntnewsservice.service.MiningService;
import com.ssafy.ssafycntnewsservice.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController // @Controller와 @ResponseBody가 합쳐진 어노테이션으로 주 용도는 Json 형태로 객체 데이터를 반환하는 것
@RequestMapping("/api")
@RequiredArgsConstructor //Lombok의 기능으로 final이 붙거나 @NotNull 이 붙은 필드의 생성자를 자동 생성
public class NewsController {
    private final NewsService newsService;
    private final MiningService miningService;
    List<NewsDto> newsdata;
    Map<String, Integer> miningdata;

    @GetMapping("/news")
    public List<NewsDto> NewsController(@RequestParam String country, String item, String startDate, String endDate) {
        newsdata = newsService.getNewsData(country, item, startDate, endDate);
        return newsdata;
    }
    @GetMapping("/news/mining")
    public Map<String, Integer> TextMining(@RequestParam String country, String item, String startDate, String endDate) {
        miningdata = miningService.getMiningData(newsdata);
        return miningdata;
    }
}
