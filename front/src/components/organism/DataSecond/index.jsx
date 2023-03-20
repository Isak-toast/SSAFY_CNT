import BarChartExport from './../../molecules/dataSecond/ExportTop5/index'
import BarChartImport from './../../molecules/dataSecond/ImportTop5/index'
import LineChartTrend from './../../molecules/dataSecond/LineGraph/index'

function DataSecond() {
  return (
    <div className="flex justify-between space-x-5 top-0 border-8 border--400">
      <LineChartTrend />
      <BarChartExport />
      <BarChartImport />
    </div>
  );
}

export default DataSecond;
