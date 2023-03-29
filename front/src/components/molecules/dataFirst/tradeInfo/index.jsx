import React from 'react';
import { useEffect } from 'react';

function tradeInfo({ data1 }) {
    let money = [data1.expdlrSum, data1.impdlrSum, data1.balpaymentsLr]        // 수출, 수입, 무역수지
    let weight = [data1.expwgtSum, data1.impwgtSum, data1.balpaymentsWgt]        // 수출, 수입, 무역수지

    if (data1.expdlrSum) {
        money = money.map(item => item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 원')
        weight = weight.map(item => item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' kg')
    }

    return (
        <div className="w-auto flex justify-between items-center font-mun text-xl ml-20">
            <div className="font-bold">
                <p>수출</p>
                <p className="mt-8">수입</p>
                <p className="mt-8">무역수지</p>
            </div>
            <div className='ml-8'>
                <p>{money[0]}</p>
                <p className="mt-8">{money[1]}</p>
                <p className="mt-8">{money[2]}</p>
            </div>
            <div className='ml-8'>
                <p>{weight[0]}</p>
                <p className="mt-8">{weight[1]}</p>
                <p className="mt-8">{weight[2]}</p>
            </div>
        </div>
    )
  }

export default tradeInfo;