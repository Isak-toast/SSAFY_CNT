package com.ssafy.ssafycntnewsservice.service;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;
import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MiningServiceImpl implements MiningService{
    List miningData = new ArrayList<>();
    Map<String, Integer> wordDict = new HashMap<>();
    @Override
    public Map<String, Integer> getMiningData(List<NewsDto> newsdata) {
        String search_word = "무역";
        String start_date = "2023.03.16";
        String end_date = "2022.02.17";
        String URL = "https://search.naver.com/search.naver?where=news&sm=tab_pge&query=" + search_word + "&sort=0&photo=0&field=0&pd=3&ds=" + start_date + "&de=" + end_date + "&cluster_rank=33&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:from20230101to20230201,a:all&start=1";
        // https://search.naver.com/search.naver?where=news&sm=tab_pge&query=%EB%AC%B4%EC%97%AD&sort=0&photo=0&field=0&pd=3&ds=2023.03.16&de=2022.02.17&cluster_rank=33&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:from20230101to20230201,a:all&start=1
        Document doc;

        try {
            doc = Jsoup.connect(URL).get();
            Elements news_title = doc.select(".news_tit"); // 제목
            System.out.println(news_title.text());

//==========================텍스트 마이닝 시작==========================//
            Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
            // 분석할 문장 = 뉴스 제목 (10개)
            String strToAnalyze = news_title.text();
            // 분석
            KomoranResult analyzeResultList = komoran.analyze(strToAnalyze);
            // 분석 결과
            List<Token> tokenList = analyzeResultList.getTokenList();
            // 결과 중 명사만 리스트로 추출
            miningData = analyzeResultList.getNouns();
            // 명사를 키로 하는 딕셔너리로 출현 횟수 세기
            System.out.println(wordDict.keySet());
            for (int i=0;i<miningData.size();i++) {
                // 한 글자 단어는 스킵
                if (miningData.get(i).toString().length() < 2) {
                    continue;
                }
                // 단어 있으면 +1
                if (wordDict.keySet().contains(miningData.get(i))) {
                    wordDict.put(miningData.get(i).toString(), wordDict.get(miningData.get(i))+1);
                    // 없으면 추가
                } else {
                    wordDict.put(miningData.get(i).toString(), 1);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
//        for (String word : wordDict.keySet()) {
//            if (wordDict.get(word) < 4) {
//            wordDict.remove(word);
//            }
//        }
        return wordDict;
    }
}
