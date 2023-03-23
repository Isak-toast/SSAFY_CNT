import MoneyRatio from './../../molecules/dataFirst/MoneyRatio/index'
import WeightRatio from './../../molecules/dataFirst/WeightRatio/index'
import TradeInfo from './../../molecules/dataFirst/tradeInfo/index'

function DataFirst() {
  
    return (
        <div className="flex justify-around items-center mt-5">
            <div className="w-auto flex justify-around">
                <MoneyRatio />
                <WeightRatio />
            </div>
            <TradeInfo />
        </div>
    );
  }
  
  export default DataFirst;