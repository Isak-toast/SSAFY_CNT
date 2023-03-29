import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Code from "../../../assets/Code.json";
import News from "../../molecules/newsTextMining/News";
import TextMining from "../../molecules/newsTextMining/TextMining";

function NewsTextMining() {
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

  // newsUrl 요청
  const newsUrl =
    "http://ssafycnt.site:8000/ssafycnt-news-service/api/news?" +
    "country=" +
    country +
    "&item=" +
    "&startDate=" +
    startDate +
    "&endDate=" +
    endDate;
  // console.log(newsUrl);

  // textMiningUrl 요청
  const textMiningUrl =
    "http://ssafycnt.site:8000/ssafycnt-news-service/api/news/mining?" +
    "country=" +
    country +
    "&item=" +
    "&startDate=" +
    startDate +
    "&endDate=" +
    endDate;

  const [newsData, setNewsData] = useState([]);
  const [textData, setTextData] = useState([]);
  // console.log(textData);

  useEffect(() => {
    axios.get(newsUrl).then((response) => setNewsData(response.data));
    axios.get(textMiningUrl).then((response) => setTextData(response.data));
  }, [params]);

  const textDataKeys = Object.keys(textData);
  // console.log(textDataKeys.length);

  let textDataInfo = [];
  for (let i = 0; i < textDataKeys.length; i++) {
    // console.log(i);
    let wordString = textDataKeys[i];
    // console.log(wordString);
    textDataInfo.push({
      text: wordString,
      value: textData[wordString].length,
    });
  }

  const [selectedWord, setSelectedWord] = useState("");
  const wordClickHandler = (event, word) => {
    setSelectedWord(word.text);
    // console.log(word.text);
  };
  // console.log(selectedWord);

  let selectedWordNewsData = [];
  if (selectedWord === "") {
    console.log("default");
  } else {
    for (let i = 0; i < 50; i++) {
      selectedWordNewsData.push(textData[selectedWord][i]);
    }
  }

  // console.log(selectedWordNewsData);

  return (
    <div>
      <News
        newsData={newsData}
        selectedWord={selectedWord}
        selectedWordNewsData={selectedWordNewsData}
      />
      {/* <News newsData={newsData} /> */}
      <TextMining
        textDataInfo={textDataInfo}
        wordClickHandler={wordClickHandler}
      />
    </div>
  );
}

export default NewsTextMining;
