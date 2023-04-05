import React, { useEffect } from "react";
import WordCloud from "react-d3-cloud";
import { useRecoilState } from "recoil";
import { textMiningImgAtom } from "../../../../states/recoilPdfState";
import html2canvas from "html2canvas";

function TextMiningI(props) {
  let textDataInfo = props.textDataInfo;
  // console.log(textDataInfo);

  return (
    <>
      <div className="mr-12">
        <WordCloud
          data={textDataInfo}
          onWordClick={props.wordClickHandler}
          font="munchebu"
          spiral="archimedean"
          rotate={() => 0}
        />

        <div className="flex flex-inline justify-center ml-2">
          {props.selectedWord === "" ? (
            <label
              className="block text-gray-700 text-sm font-bold mt-3"
              htmlFor="username"
            >
              선택된 단어: 없음
            </label>
          ) : (
            <label
              className="block text-gray-700 text-sm font-bold mt-3 "
              htmlFor="username"
            >
              선택된 단어: {props.selectedWord}
            </label>
          )}
          <button
            onClick={props.nothingHandler}
            className="bg-slate-400 w-24 h-12 rounded-full ml-10 font-mun font-bold mb-4"
          >
            뉴스 초기화
          </button>
        </div>
      </div>
    </>
  );
}

export default TextMiningI;
