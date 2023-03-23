import MoneyRatio from './../../molecules/dataFirst/MoneyRatio/index'
import WeightRatio from './../../molecules/dataFirst/WeightRatio/index'
import TradeInfo from './../../molecules/dataFirst/tradeInfo/index'
import axios from 'axios';
import { useEffect } from 'react';

function DataFirst(props) {    
    return (
        <div className="flex justify-around items-center mt-5">
            <div className="w-auto flex justify-around">
                <MoneyRatio data1={props.data1} />
                <WeightRatio data1={props.data1} />
            </div>
            <TradeInfo data1={props.data1} />
        </div>
    );
  }
  
  export default DataFirst;