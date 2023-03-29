import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-google-charts";

function WorldMap() {
  const params = useParams();
  const duration = params.duration;
  const [a, setA] = useState(params.nationCode);
  const navigate = useNavigate();

  // const data1 = [
  //   ["Country", "balnce"],
  //   ["DE", -100],
  //   ["US", -75],
  //   ["BR", -50],
  //   ["CA", -25],
  //   ["FR", 0],
  //   ["RU", 25],
  //   ["CN", 50],
  //   ["South Korea", 75],
  //   ["JP", 100],
  // ];
  const setAHandler = (e) => {
    setA(data[e][0]);
  };

  const [data, setData] = useState([]);

  const dataHandler = (data) => {
    const temp = [["Country", "무역수지 ($) "]];
    for (let i in data) {
      const item = [];
      // console.log('!@#!@!#' + i)
      console.log('!@#!@!#' + data[i]["nationName"])
      item.push(i);
      item.push(data[i]["balpaymentsLr"]);
      // item.push(data[i]["nationName"]);
      temp.push(item);
    }

    setData(temp);
  };

  //여기서 axios
  useEffect(() => {
    axios
      .get(
        "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/map?" +
          "startDate=" +
          params.duration.substring(0, 6) +
          "&" +
          "endDate=" +
          params.duration.substring(7, 12)
      )
      .then((response) => {
        dataHandler(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [duration]);

  useEffect(() => {
    navigate("/nation/" + a + "/" + params.duration);
  }, [a]);

  const options = {
    // backgroundColor: "81d4fa",
    colorAxis: {
      colors: ["008000"],
    },
    datalessRegionColor: "white",
    // forceIFrame: 20,
    geochartVersion: 11,
    height: 550,
    width: 1200,
    // legend: "none",
    tooltip: {textStyle:  {fontName: 'munchebu', fontSize: 12, bold: true}, showColorCode: true, isHtml: true, ignoreBounds: true, text: 'both'}
    // sizeAxis: { minValue: 0, maxSize: 20 },
  };

  const chartEvents = [
    {
      eventName: "select",

      callback({ chartWrapper }) {
        const selectedId = chartWrapper.getChart().getSelection();
        if (selectedId.length) {
          setAHandler(selectedId[0]["row"] + 1);
          // navigate("/nation/" + params.nationCode + "/2203-2302");
        }
      },
    },
  ];

  return (
    <>
      {/* <div className="flex mb-5 flex-start ml-10 mt-5 "> */}
      {/* <div className="w-5 h-5 rounded-full bg-red-900 mr-3"></div>
        <div className="mr-5">수출</div>
        <div className="w-5 h-5 rounded-full bg-blue-900 mr-3"></div>
        <div className="mr-5">수입</div> */}
      {/* <div className="w-5 h-5 rounded-full bg-yellow-300 mr-3"></div> */}
      {/* <div className="mr-5">수출입</div> */}
      {/* <div className="ml-20">{params.nationName}</div> */}
      {/* </div> */}
      <div className="mt-2 static flex justify-center">
        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          chartEvents={chartEvents}
        />
        {/* <div className="absolute bottom-0 left-3 mt-5">
          <p className="font-mun">무역 수지</p>
        </div> */}
      </div>
    </>
  );
}

export default WorldMap;
