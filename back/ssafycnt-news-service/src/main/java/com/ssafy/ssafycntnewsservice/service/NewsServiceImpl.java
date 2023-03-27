package com.ssafy.ssafycntnewsservice.service;

import com.ssafy.ssafycntnewsservice.dto.NewsDto;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService{
    @Override
    public List<NewsDto> getNewsData(String country, String item, String startDate, String endDate) {
        String search_word = "무역";
        String start_date = "2023.01.01";
        String end_date = CurrentDateTime();
        // 검색어 수정
        if (!Objects.equals(country, "") && !Objects.equals(item, "")) {
            search_word = new String(country + "+" + item);
        } else if (Objects.equals(item, "")) {
            search_word = new String("무역+" + country);
        } else if (Objects.equals(country, "")) {
            search_word = new String("무역+" + item);
        }
        // 검색 시작일 수정
        if (!Objects.equals(startDate, "")) {
            start_date = new String("20" + startDate + ".01");
        }
        // 검색 끝일 수정
        if (!Objects.equals(endDate, "") && (!Objects.equals(endDate, CurrentMonth()))){
            end_date = new String("20" + endDate + ".28");
        }
        String[] start_idx = {"1", "11", "21", "31", "41", "51", "61", "71", "81", "91"};
        String URL = "https://search.naver.com/search.naver?where=news&sm=tab_pge&query="
                + search_word
                + "&sort=0&photo=0&field=0&pd=3&ds=" + start_date
                + "&de=" + end_date
                + "&cluster_rank=33&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:from20230101to20230201,a:all&start=";
        // https://search.naver.com/search.naver?where=news&sm=tab_pge&query=%EB%AC%B4%EC%97%AD&sort=0&photo=0&field=0&pd=3&ds=2023.03.16&de=2022.02.17&cluster_rank=33&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:from20230101to20230201,a:all&start=1
        System.out.println(URL);

        List<NewsDto> crowlingData = new ArrayList<>();
        Document doc;
        for (int j = 0; j < 10; j++) {
            if (crowlingData.size() < 10 * j) {
                break;
            }
            try {
                doc = Jsoup.connect(URL + start_idx[j]).get();
                Elements news_press = doc.select(".info_group .press");  // 신문사
                Elements news_info = doc.select(".info_group >span");    // 시간
                Elements news_title = doc.select(".news_tit");           // 제목
                Elements news_content = doc.select(".dsc_wrap a");       // 내용

                int n = 0;
                for (int i = 0; i < news_press.size(); i++) {
                    if (news_info.size() > 10) {
                        if (news_info.get(i + n).text().contains("전") || news_info.get(i + n).text().contains(".")) {
                        } else {n++;}
                    }

                    NewsDto newsDto = new NewsDto(
                            news_press.get(i).text(),
                            news_info.get(i + n).text(),
                            news_title.get(i).text(),
                            news_content.get(i).text(),
                            news_title.get(i).attr("abs:href"));
                    crowlingData.add(newsDto);
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return crowlingData;
    }
    public String CurrentDateTime() {
            // 현재 날짜 구하기
            LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
            // 포맷 정의
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
            // 포맷 적용
            String formatedNow = now.format(formatter);
            return formatedNow;  // 2021.06.17
        }
    public String CurrentMonth() {
        // 현재 날짜 구하기
        LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
        // 포맷 정의
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy.MM");
        // 포맷 적용
        String formatedNow = now.format(formatter);
        return formatedNow;  // 2021.06
    }
    }

