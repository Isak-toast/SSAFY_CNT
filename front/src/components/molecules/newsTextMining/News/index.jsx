import React from "react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Code from "../../../../assets/Code.json";
// import NewsList from "../../../assets/NewsList.json";

// DUMMY_NEWSDATA

// const news = NewsList[0].map((news, index) => (
//   <div>
//     <li key={index}>{news.newsPress}</li>
//     <li key={index}>{news.newsDate}</li>
//     <li key={index}>{news.newsTitle}</li>
//     <li key={index}>{news.newsContent}</li>
//     <li key={index}>{news.newsLink}</li>
//   </div>
// ));

function News(props) {
  let newsData = props.newsData;
  // console.log(newsData);
  let selectedWord = props.selectedWord;
  let selectedWordNewsData = props.selectedWordNewsData;
  // console.log(selectedWordNewsData);

  return (
    // <div>1</div>
    <div>
      {selectedWord === "" ? (
        <div>
          {newsData.map((news, index) => (
            <a
              // key={index}
              href={news.newsLink}
              target="_blank"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5>{news.newsPress}</h5>
              <h5>{news.newsDate}</h5>
              <h5
                // key={index}
                className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {news.newsTitle}
              </h5>
              <p
                // key={index}
                className="font-normal text-gray-700 dark:text-gray-400"
              >
                {news.newsContent}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <div>
          {selectedWordNewsData.map((wordNews, index) => (
            <a
              // key={index}
              href={wordNews.newsLink}
              target="_blank"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5>{wordNews.newsPress}</h5>
              <h5>{wordNews.newsDate}</h5>
              <h5
                // key={index}
                className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {wordNews.newsTitle}
              </h5>
              <p
                // key={index}
                className="font-normal text-gray-700 dark:text-gray-400"
              >
                {wordNews.newsContent}
              </p>
            </a>
          ))}
        </div>
      )}
      <div>
        {newsData.map((news, index) => (
          <a
            // key={index}
            href={news.newsLink}
            target="_blank"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5>{news.newsPress}</h5>
            <h5>{news.newsDate}</h5>
            <h5
              // key={index}
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {news.newsTitle}
            </h5>
            <p
              // key={index}
              className="font-normal text-gray-700 dark:text-gray-400"
            >
              {news.newsContent}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
export default News;
