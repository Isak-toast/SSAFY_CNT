import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "flowbite";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

ChartJS.defaults.font.family = "munchebu.ttf"; // Chart 이내 글자체 통일
function NationRatio({ data1 }) {
  let duration = data1.period;
  const labels = ["수출", "수입"];
  const values = [data1.expwgtSum, data1.impwgtSum];
  const sumValues = values[0] + values[1];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        datalabels: {
          formatter: function (value) {
            return ((value / sumValues) * 100).toFixed(1).toString() + "%";
          },
        },
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false, //크기 변경을 위함
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem, data) => {
            return tooltipItem.formattedValue + " kg";
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        backgroundColor: "#404040",
        borderRadius: 3,
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "bolder 20px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "중량기준",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center ml-2 text-left">
        <div>
          <div
            data-tooltip-target="tooltip-top"
            data-tooltip-placement="top"
            className="w-72 mt-1 mb-3 font-bold text-base text-gray-12 w-40 truncate font-medium text-xl font-mun"
          >
            {data1.itemName}
          </div>
          <div
            id="tooltip-top"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 font-mun"
          >
            {data1.itemName}
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <hr className="mb-10" />
        </div>
      </div>

      <Doughnut
        options={options}
        data={data}
        width={280}
        height={280}
        plugins={[textCenter]}
      />
    </div>
  );
}

export default NationRatio;
