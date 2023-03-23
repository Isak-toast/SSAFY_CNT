import BarChartExport from './../../molecules/dataSecond/ExportTop5/index'
import BarChartImport from './../../molecules/dataSecond/ImportTop5/index'
import LineChartTrend from './../../molecules/dataSecond/LineGraph/index'
import {useState} from 'react' 

function DataSecond() {

  // 서버로 부터 받아온 데이터
  // 자동차, 가전제품, 반도체, 김치, 합성수지 (수출)
  // 원유, 자동차부품, 의료용 기기, 향신료, 타코 (수입)
  
  // 최초 렌더링 -> 특정국가 (디폴트 : 전세계), 모든 자원, 수출 데이터
  const firstExportData = {
    Jan: 243456700000,
    Feb: 213456700000,
    Mar: 190293200000,
    Apr: 302984000000
  }
  
  const Top5Data = {
    수출: {
            자동차: {Jan: 1234562323, Feb: 1034562323, Mar: 1534562323, Apr: 1634562323},
            가전제품: {Jan: 1634562323, Feb: 1234562323, Mar: 1034562323, Apr:1534562323 },
            반도체: {Jan: 1534562323, Feb: 1634562323, Mar: 1234562323, Apr: 1034562323},
            김치: {Jan: 1034562323, Feb: 1534562323, Mar: 1634562323, Apr: 1234562323},
            합성수지: {Jan:1234562323 , Feb: 1634562323, Mar: 1534562323, Apr: 1034562323},
          },
    수입: {
            원유: {Jan: 1234562323, Feb: 1034562323, Mar: 1534562323, Apr: 1634562323},
            자동차부품: {Jan: 1634562323, Feb: 1234562323, Mar: 1034562323, Apr:1534562323 },
            '의료용 기기': {Jan: 1534562323, Feb: 1634562323, Mar: 1234562323, Apr: 1034562323},
            향신료: {Jan: 1034562323, Feb: 1534562323, Mar: 1634562323, Apr: 1234562323},
            타코: {Jan:1234562323 , Feb: 1634562323, Mar: 1534562323, Apr: 1034562323},
          }
  }
  

  const [currentState, chagneState] = useState([0, 0, '모든 품목', '수출', firstExportData]) // [Export, Import] clicked???

  const onChangeExportClick = (item) => {
    chagneState([1, 0, item, '수출', Top5Data['수출'][item]])
  }

  const onChangeImportClick = (item) => {
    chagneState([0, 1, item, '수입', Top5Data['수입'][item]])
  }

  return (
    <div className="flex justify-around space-x-5 top-0 border-8 border--400">
      <LineChartTrend anyItem={currentState} />
      <BarChartExport alreadyClicked={currentState} onSaveClickOrNot={onChangeExportClick} />
      <BarChartImport alreadyClicked={currentState} onSaveClickOrNot={onChangeImportClick} />
    </div>
  );
}

export default DataSecond;
