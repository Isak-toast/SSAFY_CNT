import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DataFirstI from "../../organism/DataFirstI";
import DataSecondI from "../../organism/DataSecondI";
import DataThirdI from "../../organism/DataThirdI";
import NavBarI from "../../organism/NavBarI";
import WorldMapI from "../../organism/WorldMapI";
import NewsTextMiningI from "../../organism/NewsTextMiningI";
import html2canvas from "html2canvas";
import { useRecoilState } from "recoil";
import { data1ImgAtom } from "../../../states/recoilPdfState";
import { excelStateI1 } from "../../../states/Excel";

function Item() {
  const params = useParams();
  const [excelData, setExcelData] = useRecoilState(excelStateI1);
  const [data1Img, setData1Img] = useRecoilState(data1ImgAtom);

  // 지도 & 데이터 1열 axios 요청
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/item/onerow?" +
          "item=" +
          params.hsCode +
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
            console.log("Item Data1 Done");
          });
        }, 3000);
      });
  }, [params]);

  return (
    <>
      <div className="z-30 sticky top-0">
        <NavBarI />
      </div>
      <div className="z-0">
        <WorldMapI />
      </div>
      <DataFirstI data1={data} />
      <DataSecondI />
      <DataThirdI />
      <NewsTextMiningI />
    </>
  );
}

export default Item;
