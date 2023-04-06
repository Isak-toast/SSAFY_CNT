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
import { useRecoilState, useRecoilValue } from "recoil";
import { excelState1 } from "../../../states/Excel";
import {
  data1ImgAtom,
  pdfStateAtom,
  data1StateAtom,
  preventClickAtom,
} from "../../../states/recoilPdfState";

function Nation() {
  const params = useParams();
  const [excelData, setExcelData] = useRecoilState(excelState1);
  const [data1Img, setData1Img] = useRecoilState(data1ImgAtom);
  const [data1State, setData1State] = useRecoilState(data1StateAtom);
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
  // console.log(data1State);

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
      });
  }, [params]);

  return (
    <>
      {preventClick === true ? (
        <div>
          <div className="z-30 sticky top-0 hidden">
            <NavBar apiData={data} />
          </div>
          <div className="z-0 hidden">
            <WorldMap />
          </div>
          <DataFirst data1={data} />
          <DataSecond />
          <DataThird />
          <NewsTextMining />
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </>
    // <>
    //   {preventClick === true}
    //   <div className="z-30 sticky top-0">
    //     <NavBar apiData={data} />
    //   </div>
    //   <div className="z-0">
    //     <WorldMap />
    //   </div>
    //   <DataFirst data1={data} />
    //   <DataSecond />
    //   <DataThird />
    //   <NewsTextMining />
    // </>
  );
}

export default Nation;
