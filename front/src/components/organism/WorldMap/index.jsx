import React from "react";
import Chart from "react-google-charts";

function WorldMap() {
  const data = [
    ["Country", "수출입", "수출"],
    ["Germany", 2, 100],
    ["United States", 3, 100],
    ["Brazil", 2, 100],
    ["Canada", 3, 100],
    ["France", 1, 100],
    ["RU", 1, 100],
    ["China", 2, 100],
    ["South Korea", 2, 100],
  ];
  const options = {
    colorAxis: { colors: ["red", "yellow", "blue"] },
  };
  return (
    <>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="600px"
        data={data}
        options={options}
      />
    </>
  );
}

export default WorldMap;
