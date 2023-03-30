package com.ssafy.ssafycntnewsservice.dto;

import lombok.Data;

import java.util.Objects;

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
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        NewsDto news = (NewsDto) obj;
        return Objects.equals(newsPress, news.newsPress) &&
                Objects.equals(newsDate, news.newsDate) &&
                Objects.equals(newsTitle, news.newsTitle) &&
                Objects.equals(newsContent, news.newsContent) &&
                Objects.equals(newsLink, news.newsLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(newsPress, newsDate, newsTitle, newsContent, newsLink);
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
