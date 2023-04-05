import Chart from "chart.js/auto"; // Uncaught Error: "category" is not a registered scale
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "munchebu"; // Chart 이내 글자체 통일
ChartJS.defaults.font.size = 10; // Chart 이내 글자체 통일
ChartJS.defaults.color = "black";

function ExportTop5(props) {
  let pickNation = props.alreadyClicked[6];

  // 정렬된 순서로 들어와야함 (Top1 -> Top5)
  let labels;
  let values;

  if (
    typeof props.alreadyClicked[5]["수출"] !== "undefined" &&
    props.alreadyClicked[5]["수출"] !== null
  ) {
    labels = Object.keys(props.alreadyClicked[5]["수출"]);
  } else {
    labels = ["", "", "", "", ""];
  }

  if (
    typeof props.alreadyClicked[5]["수출"] !== "undefined" &&
    props.alreadyClicked[5]["수출"] !== null
  ) {
    values = Object.values(props.alreadyClicked[5]["수출"]);
    values = values.map(function (value) {
      return value.expdlrSum;
    });
    values = values.map(function (x) {
      return x / 1000000;
    });
  } else {
    values = [0, 0, 0, 0, 0];
  }

  const options = {
    indexAxis: "y",
    plugins: {
      tooltip: {
        enabled: true, // 그래프 호버시, 모달창 안나오게 하기
        callbacks: {
          label: function(tooltipItem, data) {
              return tooltipItem.dataset.data[tooltipItem.dataIndex].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          },
      },
      },
      legend: {
        // 범례 스타일링
        display: false,
      },
      datalabels: {
        display: true,
      },
    },

    scales: {
      // x축 y축에 대한 설정
      x: {
        axis: "x",
        border: {
          dash: [4, 4],
          display: false,
        },
        grid: {
          drawTicks: false,
          color: function (context) {
            // 시작 y열 안보이게 하기
            if (context.tick.value === 0) {
              return "rgba(0, 0, 0, 0)";
            }
            return "rgba(0, 0, 0, 0.1)";
          },
        },
      },
      y: {
        axis: "y",
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return this.getLabelForValue(value).substring(0, 6)
          }
        }
      },
    },

    onClick: function (evt, element) {
      if (element.length > 0) {
        setColorsHandler(element[0]["index"]);
        props.onSaveClickOrNot(data.labels[element[0]["index"]]);
      }
    },
  };

  const [colors, setColors] = useState([
    "rgba(240, 240, 240)",
    "rgba(240, 240, 240)",
    "rgba(240, 240, 240)",
    "rgba(240, 240, 240)",
    "rgba(240, 240, 240)",
  ]);

  const setColorsHandler = (idx) => {
    const newColors = [
      "rgba(240, 240, 240)",
      "rgba(240, 240, 240)",
      "rgba(240, 240, 240)",
      "rgba(240, 240, 240)",
      "rgba(240, 240, 240)",
    ];
    newColors[idx] = "rgba(54, 162, 235)";
    setColors(newColors);
  };

  useEffect(() => {
    if (props.alreadyClicked[0] === 1) {
      const setColorsHandler = (idx) => {
        const newColors = [
          "rgba(240, 240, 240)",
          "rgba(240, 240, 240)",
          "rgba(240, 240, 240)",
          "rgba(240, 240, 240)",
          "rgba(240, 240, 240)",
        ];
        newColors[idx] = "rgba(54, 162, 235)";
        setColors(newColors);
      };
    } else {
      const newColors = [
        "rgba(240, 240, 240)",
        "rgba(240, 240, 240)",
        "rgba(240, 240, 240)",
        "rgba(240, 240, 240)",
        "rgba(240, 240, 240)",
      ];
      setColors(newColors);
    }
  }, [props.alreadyClicked[0]]);

  const data = {
    labels,
    datasets: [
      {
        axis: "y",
        type: "bar",
        backgroundColor: colors,
        borderRadius: 5,
        borderSkipped: false,
        data: values,
        datalabels: {
          anchor: "end",
          align: "end",
          color: "black",
          formatter: function (value) {
            return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-between items-center ml-2 text-left">
        <div>
          <div className="mt-1 font-bold text-base text-gray-12 font-mun">
            {pickNation}
          </div>{" "}
          {/* 동적값으로 할당 해야함 */}
          <div className="mt-1 font-bold text-xl font-mun">수출 Top 5</div>
        </div>
        <div className="flex w-40 h-8 justify-center items-center bg-[#f3f4f6] font-bold text-xs">
          <p className="text-[#4b5563] font-mun">수출금액</p>
          <p className="ml-4 font-mun">단위: 백만달러</p>
        </div>
      </div>
      <Bar options={options} data={data} width={350} height={280} />
    </div>
  );
}

export default ExportTop5;
