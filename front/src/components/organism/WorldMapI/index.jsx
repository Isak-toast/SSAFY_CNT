import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-google-charts";

function WorldMapI() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  //reponse.data를 받고 지도 modal에 띄울 데이터를 가공하여 data 상태 변환
  const dataHandler = (data) => {
    const temp = [["Country", "무역수지 ($) "]];
    for (let i in data) {
      const item = [];
      item.push(i);
      item.push(data[i]["balpaymentsDlr"]);
      temp.push(item);
    }
    setData(temp);
  };

  //주소로부터 얻은 params가 변할 때마다 useEffect가 동작하여 데이터를 수신하고 데이터 수신이 완료되면
  //dataHandler 함수 동작
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/item/zerorow?" +
          "item=" +
          params.hsCode +
          "&" +
          "startDate=" +
          params.duration.substring(0, 6) +
          "&" +
          "endDate=" +
          params.duration.substring(7, 13)
      )
      .then((response) => {
        dataHandler(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  // 지도에 들어갈 옵션 설정
  const options = {
    colorAxis: {
      colors: ["265EAF"],
    },
    datalessRegionColor: "white",
    geochartVersion: 11,
    height: 550,
    width: 1200,
    tooltip: {
      textStyle: { fontName: "munchebu", fontSize: 12, bold: true },
      showColorCode: true,
      isHtml: true,
      ignoreBounds: true,
      text: "both",
    },
  };

  return (
    <>
      {isLoading && (
        <div className="mb-40 h-96">
          <div className="relative flex h-10 w-10 ml-96 mt-10 pt-60 ">
            <div className="animate-ping absolute h-24 w-24 rounded-full bg-sky-400 opacity-75"></div>
            <div className="relative  rounded-full bg-sky-500"></div>
          </div>
          <span className="text-5xl font-mun  mt-90">세계지도 로딩중...</span>
        </div>
      )}

      {!isLoading && (
        <div className="mt-2 static flex justify-center">
          <Chart chartType="GeoChart" data={data} options={options} />
        </div>
      )}
    </>
  );
}

export default WorldMapI;
