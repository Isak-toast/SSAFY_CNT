package com.ssafy.ssafycntnewsservice.service;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;

import java.util.List;

public interface NewsService {
    //    Map<String, Object> getNewsData();
    List<NewsDto> getNewsData();
}
