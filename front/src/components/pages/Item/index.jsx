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
import { useRecoilState, useRecoilValue } from "recoil";
import {
  data1ImgAtom,
  pdfStateAtom,
  data1StateAtom,
  preventClickAtom,
  pdfData1CommentAtom,
} from "../../../states/recoilPdfState";
import { excelStateI1 } from "../../../states/Excel";
import Footer from "../../organism/Footer/index"

function Item() {
  const params = useParams();
  const [excelData, setExcelData] = useRecoilState(excelStateI1);
  const [data1Img, setData1Img] = useRecoilState(data1ImgAtom);
  const [data1State, setData1State] = useRecoilState(data1StateAtom);

  // pdfData1CommentAtom을 이용하여 Data1의 정보를 상태관리
  const [pdfData1Comment, setPdfData1Comment] =
    useRecoilState(pdfData1CommentAtom);
  // console.log(pdfData1Comment);

  const pdfState = useRecoilValue(pdfStateAtom);
  const preventClick = useRecoilValue(preventClickAtom);

  // PDF Button Click 시, pdfState가 true로 변경되며 Rendering이 완료된 화면을 Capture
  // 화면 Capture 완료 후, data1State를 true로 변경하며 화면 Capture 완료 상태를 관리
  useEffect(() => {
    if (pdfState === true) {
      const input = document.getElementById("data1ImgHandler");
      html2canvas(input).then((canvas) => {
        let data1 = canvas.toDataURL("image/png");
        setData1Img(data1);
        setData1State(true);
        // console.log("Item Data1 Done");
      });
    }
  }, [pdfState]);

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
        setPdfData1Comment(response.data);
      });
  }, [params]);

  return (
    <>
      {preventClick === true ? (
        <div>
          <div className="z-30 sticky top-0 hidden">
            <NavBarI apiData={data} />
          </div>
          <div className="z-0 hidden">
            <WorldMapI />
          </div>
          <DataFirstI data1={data} />
          <DataSecondI />
          <DataThirdI />
          <NewsTextMiningI />
        </div>
      ) : (
        <div>
          <div className="z-30 sticky top-0">
            <NavBarI />
          </div>
          <div className="z-0">
            <WorldMapI apiData={data} />
          </div>
          <DataFirstI data1={data} />
          <DataSecondI />
          <DataThirdI />
          <NewsTextMiningI />
          <Footer/>
        </div>
      )}
      {/* <div className="z-30 sticky top-0">
        <NavBarI />
      </div>
      <div className="z-0">
        <WorldMapI />
      </div>
      <DataFirstI data1={data} />
      <DataSecondI />
      <DataThirdI />
      <NewsTextMiningI /> */}
    </>
  );
}

export default Item;
