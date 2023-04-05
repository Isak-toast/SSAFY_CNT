import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Code from "../../../assets/Code.json";
import News from "../../molecules/newsTextMining/News";
import TextMining from "../../molecules/newsTextMining/TextMining";
import { useRecoilState } from "recoil";
import { textMiningImgAtom } from "../../../states/recoilPdfState";
import html2canvas from "html2canvas";

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
  // console.log(countryList);

  const countryFullName = countryList[0];
  // console.log(countryFullName);

  // url 중 'country='에 국가이름이 입력. But, 전체국가 선택시 'county='가 되어야 하는데, 'country=전세계'가 되서 if문 사용하여 수정
  const country = [];
  if (countryFullName === "전세계") {
    country.push();
  } else {
    country.push(countryFullName.split(" ")[0]);
  }
  // console.log(country);

  // startDate와 endDate 연결
  const paramsDuration = params.duration;

  const startDate =
    paramsDuration.substring(0, 4) + "." + paramsDuration.substring(4, 6);
  const endDate =
    paramsDuration.substring(7, 11) + "." + paramsDuration.substring(11, 13);
  // console.log(startDate, endDate);

  const [textMiningImg, setTextMiningImg] = useRecoilState(textMiningImgAtom);

  // newsUrl 요청
  const newsUrl =
    "https://ssafycnt.site:8000/ssafycnt-news-service/api/news?" +
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
    "https://ssafycnt.site:8000/ssafycnt-news-service/api/news/mining?" +
    "country=" +
    country +
    "&item=" +
    "&startDate=" +
    startDate +
    "&endDate=" +
    endDate;

  const [newsData, setNewsData] = useState([]);
  // console.log(newsData);
  const [textData, setTextData] = useState([]);
  // console.log(textData);

  useEffect(() => {
    axios.get(newsUrl).then((response) => setNewsData(response.data));
    axios.get(textMiningUrl).then((response) => {
      setTextData(response.data);
      const input = document.getElementById("textMiningImgHadler");
      html2canvas(input).then((canvas) => {
        const textMining = canvas.toDataURL("image/png");
        setTextMiningImg(textMining);
      });
    });
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
    <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
      <div
        className="overflow-y-scroll scrollbar-hide bg-gray-300 mt-10"
        style={{ height: "600px" }}
      >
        <News
          newsData={newsData}
          selectedWord={selectedWord}
          selectedWordNewsData={selectedWordNewsData}
        />
      </div>

      <div id="textMiningImgHadler">
        {/* <div>선택 단어 : {selectedWord}</div> */}
        <TextMining
          textDataInfo={textDataInfo}
          wordClickHandler={wordClickHandler}
          nothingHandler={nothingHandler}
          selectedWord={selectedWord}
        />
      </div>
    </div>
  );
}

export default NewsTextMining;
