import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../organism/NavBar";
import DataFirst from "../../organism/DataFirst";
import DataSecond from "../../organism/DataSecond";
import DataThird from "../../organism/DataThird/index";
import WorldMap from "../../organism/WorldMap";
import NewsTextMining from "../../organism/NewsTextMining";
// import News from "../../organism/News";
// import TextMining from "../../organism/TextMining";

function Nation() {
  const params = useParams();

  // 지도 & 데이터 1열 axios 요청
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/onerow?" +
        // "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/data1?" +
          "statCd=" +
          // "statcd=" +
          params.nationCode +
          "&" +
          "startDate=" +
          params.duration.substring(0, 6) +
          "&" +
          "endDate=" +
          params.duration.substring(7, 13)
      )
      .then((response) => setData(response.data));
  }, [params]);

  return (
    <>
      <div className="z-30 sticky top-0">
        <NavBar />
      </div>

      <div className="z-0">
        <WorldMap />
      </div>
      <DataFirst data1={data} />
      <DataSecond />
      <DataThird />
      {/* <TextMining />
      <News /> */}
      <NewsTextMining />
    </>
  );
}

export default Nation;
