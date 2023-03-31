import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Code from "../../../assets/Code.json";
import NewsI from "../../molecules/newsTextMiningI/NewsI";
import TextMiningI from "../../molecules/newsTextMiningI/TextMiningI";

function NewsTextMiningI() {
  const params = useParams();

  const paramsHsCode = params.hsCode;
  // console.log(paramsHsCode);
  const itemList = [];
  for (let i = 4; i < Code.성질통합분류코드.length; i++) {
    let itemHsCode = Code.성질통합분류코드[i].Column2;
    let itemName = Code.성질통합분류코드[i].Column5;
    if (itemHsCode === paramsHsCode) {
      itemList.push(itemName);
    }
  }
  // console.log(itemList);

  const itemFullName = itemList[0];
  // console.log(itemFullName);

  const item = [];
  if (itemFullName === "전품목") {
    item.push();
  } else {
    item.push(itemFullName);
  }
  // console.log(item);

  // startDate와 endDate 연결
  const paramsDuration = params.duration;

  const startDate =
    paramsDuration.substring(0, 4) + "." + paramsDuration.substring(4, 6);
  const endDate =
    paramsDuration.substring(7, 11) + "." + paramsDuration.substring(11, 13);
  // console.log(startDate, endDate);

  // newsUrl 요청
  const newsUrl =
    "http://ssafycnt.site:8000/ssafycnt-news-service/api/news?" +
    "country=" +
    "&item=" +
    item +
    "&startDate=" +
    startDate +
    "&endDate=" +
    endDate;
  // console.log(newsUrl);

  // textMiningUrl 요청
  const textMiningUrl =
    "http://ssafycnt.site:8000/ssafycnt-news-service/api/news/mining?" +
    "country=" +
    "&item=" +
    item +
    "&startDate=" +
    startDate +
    "&endDate=" +
    endDate;
  // console.log(textMiningUrl);

  const [newsData, setNewsData] = useState([]);
  // console.log(newsData);
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
      value: textData[wordString].length * 300,
    });
  }

  // TextMining 단어 클릭 시 해당 단어 저장
  // But, 단어 클릭 시 TextMining 구조가 재배치
  const [selectedWord, setSelectedWord] = useState("");
  const wordClickHandler = (event, word) => {
    setSelectedWord(word.text);
    // console.log(word.text);
  };
  useEffect(() => {
    setSelectedWord("");
  }, [params]);

  // 선택 단어 초기화
  const nothingHandler = (event) => {
    setSelectedWord("");
  };
  // console.log(selectedWord);

  // console.log(textData[selectedWord]);

  const selectedWordNewsData = [];
  if (selectedWord === "") {
    // for (let i = 0; i < newsData.length; i++) {
    //   selectedWordNewsData.push(newsData[i]);
    // }
  } else {
    for (let i = 0; i < textData[selectedWord].length; i++) {
      selectedWordNewsData.push(textData[selectedWord][i]);
    }
  }
  // console.log(selectedWordNewsData);

  return (
    <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
      <div className="max-h-96 overflow-y-scroll scrollbar-hide bg-blue-300 mt-40">
        <NewsI
          newsData={newsData}
          selectedWord={selectedWord}
          selectedWordNewsData={selectedWordNewsData}
        />
      </div>

      <div>
        <div>선택 단어 : {selectedWord}</div>
        <TextMiningI
          textDataInfo={textDataInfo}
          wordClickHandler={wordClickHandler}
          nothingHandler={nothingHandler}
        />
      </div>
    </div>
  );
}

export default NewsTextMiningI;
