package com.ssafy.ssafycntnewsservice.service;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;
import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MiningServiceImpl implements MiningService{
    Map<String, List<NewsDto>> wordDict = new HashMap<>();
    Map<String, List<NewsDto>> miningResult = new HashMap<>();
    @Override
    public Map<String, List<NewsDto>> getMiningData(List<NewsDto> newsdata) {
        Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);

        for (NewsDto news : newsdata) {

            String strToAnalyze = news.getNewsTitle();
            KomoranResult analyzeResultList = komoran.analyze(strToAnalyze);
            List<String> miningData = analyzeResultList.getNouns();

            List<NewsDto> newsDtoList;
            for (String word : miningData) {
                if (word.length() < 2) {
                    continue;
                }
                if (word.matches("[0-9]+")) {
                    continue;
                }
                newsDtoList = wordDict.computeIfAbsent(word, k -> new ArrayList<>(newsdata.size()));
                newsDtoList.add(news);
            }
        }

        for (Map.Entry<String, List<NewsDto>> entry : wordDict.entrySet()) {
            if (entry.getValue().size() > 2) {
                miningResult.put(entry.getKey(), entry.getValue());
            }
        }

        return miningResult;
    }
}