import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Code from "../../../../assets/Code.json";
// import { useParams } from "react-router-dom";
// import TextMiningInfo from "../../../../assets/TextMiningInfo.json";
import WordCloud from "react-d3-cloud";

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

function TextMining(props) {
  let textDataInfo = props.textDataInfo;
  // console.log(textDataInfo);

  return (
    <>
      <WordCloud
        data={textDataInfo}
        // onWordClick={(event, d) => {
        //   console.log(`onWordClick: ${d.text}`);
        // }}
        onWordClick={props.wordClickHandler}
      />
      <button onClick={props.nothingHandler}>초기화</button>
    </>
  );
}

export default TextMining;
