package com.ssafy.ssafycntnewsservice.service;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;
import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MiningServiceImpl implements MiningService{
    @Override
    public Map<String, List<NewsDto>> getMiningData(List<NewsDto> newsdata) {
        Map<String, List<NewsDto>> wordDict = new HashMap<>();      // {명사:[뉴스DTO]} 딕셔너리
        Map<String, List<NewsDto>> miningResult = new HashMap<>();  // 위에서 정렬 50개 추출
        Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
        for (NewsDto news : newsdata) {
            // Komoran으로 명사 추출하기
            String strToAnalyze = news.getNewsTitle();
            KomoranResult analyzeResultList = komoran.analyze(strToAnalyze);
            List<String> miningData = analyzeResultList.getNouns();
            for (String word : miningData) {
                // 한 단어는 스킵
                if (word.length() < 2) {
                    continue;
                }
                // 숫자면 스킵
                if (word.matches("[0-9]+")) {
                    continue;
                }
                List<NewsDto> newsDtoList = wordDict.computeIfAbsent(word, k -> new ArrayList<>());
                newsDtoList.add(news);
            }
        }
        // 단어 많은 순으로 정렬해서 50개만 보내기
        List<Map.Entry<String, List<NewsDto>>> entries = new ArrayList<>(wordDict.entrySet());
        // entry들을 value로 내림차순 정렬
        Collections.sort(entries, (e1, e2) -> e2.getValue().size() - e1.getValue().size());
        // 상위 50개의 entry를 miningResult에 추가

        System.out.println("before mining result : " + miningResult.get(0) + miningResult.size());
        for (int i = 0; i < 50 && i < entries.size(); i++) {
            Map.Entry<String, List<NewsDto>> entry = entries.get(i);
            miningResult.put(entry.getKey(), entry.getValue());
        }
        System.out.println("after mining result : " + miningResult.get(0) + miningResult.size());

        return miningResult;
    }
}