import MoneyRatio from './../../molecules/dataFirst/MoneyRatio/index'
import WeightRatio from './../../molecules/dataFirst/WeightRatio/index'
import TradeInfo from './../../molecules/dataFirst/tradeInfo/index'

function DataFirst(props) {    
    return (
        <div className="mt-10">
            <div className="flex justify-center">
                <MoneyRatio data1={props.data1} />
                <WeightRatio data1={props.data1} />
                <TradeInfo data1={props.data1} />
            </div>
        </div>
    );
  }
  
  export default DataFirst;