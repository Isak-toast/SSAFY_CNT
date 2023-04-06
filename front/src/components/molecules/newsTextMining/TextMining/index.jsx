import React from "react";
import WordCloud from "react-d3-cloud";

function TextMining(props) {
  let textDataInfo = props.textDataInfo;
  // console.log(textDataInfo);

  return (
    <>
      <div className="font-mun mt-10">
        <div className="flex justify-center ml-2">
          {props.selectedWord === "" ? (
            <label
              className="block text-gray-700 text-4xl font-bold"
              htmlFor="username"
            >
              키워드 : 없음
            </label>
          ) : (
            <label
              className="block text-gray-700 text-4xl font-bold"
              htmlFor="username"
            >
              키워드 : {props.selectedWord}
            </label>
          )}
        </div>
        <div className="flex justify-end mr-7 mb-4">
          <button
            onClick={props.nothingHandler}
            className="rounded hover:rounded-lg bg-gray-200 mr-3 pl-2 pr-2 pt-1 pb-1 font-bold justify-end"
          >
            뉴스 초기화
          </button>
        </div>
        <WordCloud
          data={textDataInfo}
          onWordClick={props.wordClickHandler}
          font="munchebu"
          spiral="archimedean"
          width={500}
          height={350}
          rotate={() => 0}
          random={() => 0}
        />
        {/* <div className="flex flex-inline justify-center ml-2">
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
        </div> */}
      </div>
    </>
  );
}

export default TextMining;
