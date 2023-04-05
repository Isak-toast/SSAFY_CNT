import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../organism/NavBar";
import DataFirst from "../../organism/DataFirst";
import DataSecond from "../../organism/DataSecond";
import DataThird from "../../organism/DataThird/index";
import WorldMap from "../../organism/WorldMap";
import NewsTextMining from "../../organism/NewsTextMining";
import html2canvas from "html2canvas";
import { useRecoilState } from "recoil";
import { excelState1 } from "../../../states/Excel";
import { data1ImgAtom } from "../../../states/recoilPdfState";

function Nation() {
  const params = useParams();
  const [excelData, setExcelData] = useRecoilState(excelState1);
  const [data1Img, setData1Img] = useRecoilState(data1ImgAtom);

  // 지도 & 데이터 1열 axios 요청
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/onerow?" +
          "statCd=" +
          params.nationCode +
          "&" +
          "startDate=" +
          params.duration.substring(0, 6) +
          "&" +
          "endDate=" +
          params.duration.substring(7, 13)
      )
      .then((response) => {
        setData(response.data);
        setExcelData(response.data);
        setTimeout(() => {
          const input = document.getElementById("data1ImgHandler");
          html2canvas(input).then((canvas) => {
            let data1 = canvas.toDataURL("image/png");
            setData1Img(data1);
            console.log("!!!!!!!!!!!!!!!!!!!!");
          });
        }, 3000);
      });
  }, [params]);

  return (
    <>
      <div className="z-30 sticky top-0">
        <NavBar apiData={data} />
      </div>
      <div className="z-0">
        <WorldMap />
      </div>
      <DataFirst data1={data} />
      <DataSecond />
      <DataThird />
      <NewsTextMining />
    </>
  );
}

export default Nation;
