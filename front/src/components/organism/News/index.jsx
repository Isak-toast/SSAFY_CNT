import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Code from "../../../assets/Code.json";
// import NewsList from "../../../assets/NewsList.json";

// console.log(NewsList[0].newsDate);
// const newsList = useEffect(() => {
//   axios
//     .get(
//       "http://ssafycnt.site:8000/ssafycnt-news-service/api/news?" +
//         "country=" +
//         "&item=" +
//         "&StartDate=" +
//         "&EndDate="
//     )
//     .then((response) => console.log(response));
// }, []);

// const news = NewsList[0].map((news, index) => (
//   <div>
//     <li key={index}>{news.newsPress}</li>
//     <li key={index}>{news.newsDate}</li>
//     <li key={index}>{news.newsTitle}</li>
//     <li key={index}>{news.newsContent}</li>
//     <li key={index}>{news.newsLink}</li>
//   </div>
// ));

function News() {
  const params = useParams();

  const paramsNationCode = params.nationCode;
  const paramsNation = Code.국가코드;
  const countryList = [];
  for (let i = 3; i < paramsNation.length; i++) {
    if (paramsNation[i].Column1 === params.nationCode) {
      countryList.push(paramsNation[i].Column2);
    }
  }
  const countryFullName = countryList[0];
  const country = countryFullName.split(" ")[0];
  // console.log(country);

  // startDate와 endDate 연결
  const paramsDuration = params.duration;

  const startDate =
    paramsDuration.substring(2, 4) + "." + paramsDuration.substring(4, 6);
  const endDate =
    paramsDuration.substring(9, 11) + "." + paramsDuration.substring(11, 13);
  // console.log(startDate, endDate);

  const url =
    "http://ssafycnt.site:8000/ssafycnt-news-service/api/news?" +
    "country=" +
    country +
    "&item=" +
    "&startDate=" +
    startDate +
    "&endDate=" +
    endDate;
  // console.log(url);

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => setNewsData(response.data));
  }, [params]);
  // console.log(newsData[0]);

  return (
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
  );
}
export default News;
