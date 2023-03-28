import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-google-charts";

function WorldMap({ data1 }) {
  const params = useParams();
  const [a, setA] = useState(params.nationCode);
  const navigate = useNavigate();

  const data = [
    ["Country", "수출입", "수출"],
    ["Germany", 2, 100],
    ["US", 3, 100],
    ["Brazil", 2, 100],
    ["Canada", 3, 100],
    ["France", 1, 100],
    ["RU", 1, 100],
    ["CN", 2, 100],
    ["South Korea", 2, 100],
    ["Japan", 1, 100],
  ];
  const setAHandler = (e) => {
    setA(data[e][0]);
  };

  useEffect(() => {
    navigate("/nation/" + a + "/" + params.duration);
  }, [a]);

  const options = {
    // backgroundColor: "",
    colorAxis: { colors: ["FCA5A5", "FDE047", "93C5FD"] },
    // datalessRegionColor: "black",
    // forceIFrame: 20,
    geochartVersion: 11,
    height: 550,
    legend: "none",
    // tooltip: { textStyle: { color: "black" }, showColorCode: true },
    tooltip: { trigger: "focus" },
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
      <div className="flex mb-5 flex-start ml-10 mt-5">
        <div className="w-5 h-5 rounded-full bg-red-300 mr-3"></div>
        <div className="mr-5">수출</div>
        <div className="w-5 h-5 rounded-full bg-blue-300 mr-3"></div>
        <div className="mr-5">수입</div>
        <div className="w-5 h-5 rounded-full bg-yellow-300 mr-3"></div>
        <div className="mr-5">수출입</div>
        <div className="ml-20">{params.nationName}</div>
        <div className="ml-20">balance :{data1.balpayments}</div>
      </div>
      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
        chartEvents={chartEvents}
      />
    </>
  );
}

export default WorldMap;
