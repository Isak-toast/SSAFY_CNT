import React from "react";
import WordCloud from "react-d3-cloud";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Code from "../../../../assets/Code.json";
// import { useParams } from "react-router-dom";
// import TextMiningInfo from "../../../../assets/TextMiningInfo.json";

// DUMMY_TEXTDATA
// const textMiningInfo = Object.keys(TextMiningInfo);
// const textInfo = [];
// for (let i = 0; i < textMiningInfo.length; i++) {
//   let wordString = textMiningInfo[i];
//   textInfo.push({
//     text: wordString,
//     value: TextMiningInfo[wordString].length,
//   });
// }
// console.log(textInfo);

function TextMiningI(props) {
  let textDataInfo = props.textDataInfo;
  // console.log(textDataInfo);

  return (
    <>
      <div className="mr-12">
        <WordCloud
          data={textDataInfo}
          // onWordClick={(event, d) => {
          //   console.log(`onWordClick: ${d.text}`);
          // }}
          onWordClick={props.wordClickHandler}
          font="munchebu"
          spiral="archimedean"
          rotate={() => 0}
        />
        <button
          onClick={props.nothingHandler}
          className="bg-slate-400 w-24 h-12 rounded-full ml-96 font-mun font-bold mb-4"
        >
          뉴스 초기화
        </button>
      </div>
    </>
  );
}

export default TextMiningI;
