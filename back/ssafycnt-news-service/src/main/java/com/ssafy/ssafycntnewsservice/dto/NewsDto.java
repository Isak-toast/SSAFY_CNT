package com.ssafy.ssafycntnewsservice.dto;

import lombok.Data;

@Data
public class NewsDto {
    private String newsPress;
    private String newsDate;
    private String newsTitle;
    private String newsContent;
    private String newsLink;

    public NewsDto(String newsPress, String newsDate, String newsTitle, String newsContent, String newsLink) {
        this.newsPress = newsPress;
        this.newsDate = newsDate;
        this.newsTitle = newsTitle;
        this.newsContent = newsContent;
        this.newsLink = newsLink;
    }

    public String getNewsPress() {
        return newsPress;
    }

    public void setNewsPress(String newsPress) {
        this.newsPress = newsPress;
    }

    public String getNewsDate() {
        return newsDate;
    }

    public void setNewsDate(String newsDate) {
        this.newsDate = newsDate;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public String getNewsLink() {
        return newsLink;
    }

    public void setNewsLink(String newsLink) {
        this.newsLink = newsLink;
    }
}
