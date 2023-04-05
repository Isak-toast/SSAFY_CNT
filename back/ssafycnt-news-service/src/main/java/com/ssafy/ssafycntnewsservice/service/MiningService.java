package com.ssafy.ssafycntnewsservice.service;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;

import java.util.List;
import java.util.Map;

public interface MiningService {
    Map<String, List<NewsDto>> getMiningData(List<NewsDto> newsdata, String country, String item);
}
