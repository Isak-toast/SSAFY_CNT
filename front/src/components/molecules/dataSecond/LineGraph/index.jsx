import Chart from 'chart.js/auto';  // Uncaught Error: "category" is not a registered scale
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
  );

ChartJS.defaults.font.family = "munchebu"             // Chart 이내 글자체 통일
ChartJS.defaults.font.size = 10             // Chart 이내 글자체 통일
ChartJS.defaults.color = "black";

function TrendItems(props) {
    const imOrExport = props.anyItem[3]
    const pickItem = props.anyItem[2]

    let labels
    let values
    let changeRate

    // 정렬된 순서로 들어와야함 (Top1 -> Top5)
    if (Object.keys(props.anyItem[7]).length === 3) {
        labels = Object.keys(props.anyItem[7]).map(v => {
            if (v != 'changeRate') {
                return v
            }
        }).filter(element => element)
        values = Object.values(props.anyItem[7]).map(v => {
            if (typeof(v) !== 'object') {
                return v
            }
        }).filter(element => element)
        changeRate = props.anyItem[7]['changeRate']
    } else {
        labels = Object.keys(props.anyItem[7])    // Top5 품목
        values = Object.values(props.anyItem[7])    // Top5 품목 수출량
        console.log(props.anyItem[7])
    }

    values = values.map(function(x) {
        return x / 1000000
    });
    
    const options = {
        indexAxis: 'x',
        plugins: {
                    tooltip: {
                        enabled: true,        // 그래프 호버시, 모달창 안나오게 하기
                        callbacks: {
                                label: function(tooltipItem, data) {
                                    return '금액 : ' + tooltipItem.dataset.data[tooltipItem.dataIndex] + ' 백만달러'
                                },
                                afterLabel: function (tooltipItem, data) {
                                    return '증감율 : ' + tooltipItem.dataset.data1[tooltipItem.dataIndex] + ' %'
                                },
                        },
                        displayColors: false,
                        // bodyColor: '#0066ff',
                    },
                    legend: {               // 범례 스타일링
                        display: false,
                    },
                    datalabels: {
                        display: false,
                    },
                },
        
        scales: {                   // x축 y축에 대한 설정
            x: {
                axis: 'x',
            },
            y: {
                axis: 'y',
            },
        },
    }
    
    const data = {
        labels,
        datasets: [
          {
            type: 'line',
            borderRadius: 5,
            data: values,
            data1: changeRate
        },
      ],
    };

    return (
        <div className='mr-3'>
            <div className='flex justify-between items-center ml-2 text-left mb-3'>
                <div>
                    <div className='mt-1 font-bold text-base text-gray-12'>{ pickItem }</div>               
                    <div className='mt-1 font-bold text-xl font-mun'>{imOrExport} 추세</div>
                </div>
                <div className='flex w-40 h-8 justify-center items-center bg-[#f3f4f6] font-bold text-xs'>
                    <p className='text-[#4b5563] font-mun'>{imOrExport}금액</p>
                    <p className='ml-4 font-mun'>단위: 백만달러</p>
                </div>
            </div>
            <Line options={options} data={data} width={350} height={280} />
        </div>
    )
  }

export default TrendItems;