function tradeInfo() {
    let money = [750000, 500000]        // 수출, 수입, 무역수지
    money.push(money[0] - money[1])
    money = money.map(item => item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' 원')

    let weight = [123456, 12345]        // 수출, 수입, 무역수지
    weight.push(weight[0] - weight[1])
    weight = weight.map(item => item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' kg')

    return (
        <div className="w-96 h-28 flex justify-between items-center font-mun text-xl mr-20">
            <div className="font-bold">
                <p>수출</p>
                <p className="mt-8">수입</p>
                <p className="mt-8">무역수지</p>
            </div>
            <div>
                <p>{money[0]}</p>
                <p className="mt-8">{money[1]}</p>
                <p className="mt-8">{money[2]}</p>
            </div>
            <div>
                <p>{weight[0]}</p>
                <p className="mt-8">{weight[1]}</p>
                <p className="mt-8">{weight[2]}</p>
            </div>
        </div>
    )
  }

export default tradeInfo;