import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-google-charts";

function WorldMap() {
  const params = useParams();
  const duration = params.duration;
  const [a, setA] = useState(params.nationCode);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const setAHandler = (e) => {
    setA(data[e][0]);
  };
  const [data, setData] = useState([]);
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

  useEffect(() => {
    axios
      .get(
        "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/zerorow?" +
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
  }, [duration]);

  useEffect(() => {
    navigate("/nation/" + a + "/" + params.duration);
  }, [a]);

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

  const chartEvents = [
    {
      eventName: "select",

      callback({ chartWrapper }) {
        const selectedId = chartWrapper.getChart().getSelection();
        if (selectedId.length) {
          setAHandler(selectedId[0]["row"] + 1);
        }
      },
    },
  ];

  return (
    <>
      {isLoading && (
        <div className="mb-40 h-96">
          <div className="relative flex h-10 w-10 ml-96 mt-10 pt-60 ">
            <div className="animate-ping absolute h-24 w-24 rounded-full bg-sky-400 opacity-75"></div>
            <div className="relative  rounded-full bg-sky-500"></div>
          </div>
          <span className="text-5xl font-mun mr-90 mt-90">
            세계지도 로딩중...
          </span>
        </div>
      )}
      {!isLoading && (
        <div className="mt-2 static flex justify-center">
          <Chart
            chartType="GeoChart"
            data={data}
            options={options}
            chartEvents={chartEvents}
          />
        </div>
      )}
    </>
  );
}

export default WorldMap;
