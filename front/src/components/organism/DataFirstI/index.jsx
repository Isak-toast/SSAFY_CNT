import MoneyRatio from "./../../molecules/dataFirstI/MoneyRatio/index";
import WeightRatio from "./../../molecules/dataFirstI/WeightRatio/index";
import TradeInfo from "./../../molecules/dataFirstI/tradeInfo/index";

function DataFirstI(props) {
  return (
    <div className="mt-10">
      <div className="flex justify-center" id="data1ImgHandler">
        <MoneyRatio data1={props.data1} />
        <WeightRatio data1={props.data1} />
        <TradeInfo data1={props.data1} />
      </div>
    </div>
  );
}

export default DataFirstI;
