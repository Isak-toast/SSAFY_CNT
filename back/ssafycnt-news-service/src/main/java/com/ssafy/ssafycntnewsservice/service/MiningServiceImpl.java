package com.ssafy.ssafycntnewsservice.service;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;
import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MiningServiceImpl implements MiningService{
    List miningData = new ArrayList<>();
    Map<String, List<NewsDto>> wordDict = new HashMap<>();
    Map<String, List<NewsDto>> miningResult = new HashMap<>();
    @Override
    public Map<String, List<NewsDto>> getMiningData(List<NewsDto> newsdata) {
        for (NewsDto news : newsdata) {
            Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
            String strToAnalyze = news.getNewsTitle();
            KomoranResult analyzeResultList = komoran.analyze(strToAnalyze);
            miningData = analyzeResultList.getNouns();

            // 명사를 키로 하는 딕셔너리로 출현 횟수 세기
            // System.out.println(wordDict.keySet());
            for (int i=0;i<miningData.size();i++) {
                // 한 글자 단어는 스킵
                if (miningData.get(i).toString().length() < 2) {
                    continue;
                }
                try {
                    Integer.parseInt(miningData.get(i).toString());
                    continue;
                } catch (NumberFormatException ex) {
                }
                // 단어 있으면 +1
                if (wordDict.keySet().contains(miningData.get(i))) {
                    wordDict.get(miningData.get(i)).add(news);
                    // 없으면 추가
                } else {
                    List<NewsDto> newsDtoList= new ArrayList<>();
                    newsDtoList.add(news);
                    wordDict.put(miningData.get(i).toString(), newsDtoList);
                }
            }
        }

        for (String word : wordDict.keySet()) {
            if (wordDict.get(word).size() > 2) {
                miningResult.put(word, wordDict.get(word));
            }
        }
        return miningResult;
    }
}
