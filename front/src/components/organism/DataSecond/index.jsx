import BarChartExport from './../../molecules/dataSecond/ExportTop5/index'
import BarChartImport from './../../molecules/dataSecond/ImportTop5/index'
import LineChartTrend from './../../molecules/dataSecond/LineGraph/index'
import {useState} from 'react' 

function DataSecond() {
  const [currentState, chagneState] = useState([0, 0, '모든 품목', '수출']) // [Export, Import] clicked???

  const onChangeExportClick = (item) => {
    chagneState([1, 0, item, '수출'])
  }

  const onChangeImportClick = (item) => {
    chagneState([0, 1, item, '수입'])
  }

  return (
    <div className="flex justify-between space-x-5 top-0 border-8 border--400">
      <LineChartTrend anyItem={currentState} />
      <BarChartExport alreadyClicked={currentState} onSaveClickOrNot={onChangeExportClick} />
      <BarChartImport alreadyClicked={currentState} onSaveClickOrNot={onChangeImportClick} />
    </div>
  );
}

export default DataSecond;
