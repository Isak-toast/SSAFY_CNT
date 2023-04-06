import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import pdf from "../../../../assets/pdf.svg";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
  pdfStateAtom,
  data1StateAtom,
  data2StateAtom,
  data3StateAtom,
  textMiningStateAtom,
  preventClickAtom,
  pdfData1CommentAtom,
} from "../../../../states/recoilPdfState";

function Pdf() {
  // buttonState를 이용하여 화면 Rendering 시작 5초 후에 Button 활성화
  const [buttonState, setButtonState] = useState(false);

  // Capture한 Image 경로 저장
  const data1Img = useRecoilValue(data1ImgAtom);
  const data2Img = useRecoilValue(data2ImgAtom);
  const data3Img = useRecoilValue(data3ImgAtom);
  const textMiningImg = useRecoilValue(textMiningImgAtom);

  // pdfStateAtom을 이용하여 pdfState가 true일 경우에만 화면 Image를 Capture
  const [pdfState, setPdfState] = useRecoilState(pdfStateAtom);
  // console.log(pdfState)

  // data1StateAtom, data2StateAtom, data3StateAtom, textMiningStateAtom을 이용하여 Rendering 이후 Capture한 화면의 Image 경로를 저장하고 상태를 변경
  const [data1State, setData1State] = useRecoilState(data1StateAtom);
  const [data2State, setData2State] = useRecoilState(data2StateAtom);
  const [data3State, setData3State] = useRecoilState(data3StateAtom);
  const [textMiningState, setTextMiningState] =
    useRecoilState(textMiningStateAtom);
  // console.log(data1State, data2State, data3State, textMiningState);

  // preventClickAtom을 이용하여 화면 Capture Image 경로 저장 시 NavBar와 WorldMap의 Clcik을 방지
  const [preventClick, setPreventClick] = useRecoilState(preventClickAtom);

  // 상태관리가 이뤄진 pdfData1CommentAtom을 사용해 PDF 내용 구성
  const pdfData1Comment = useRecoilValue(pdfData1CommentAtom);
  // console.log(pdfData1Comment);

  const params = useParams();

  // PDF 작성에 필요한 durationList 생성
  const durationList = [];
  durationList.push({
    startY: params.duration.substring(0, 4),
    startM: params.duration.substring(4, 6),
    endY: params.duration.substring(7, 11),
    endM: params.duration.substring(11, 13),
  });

  // params 변경 시 ButtonState를 false로 변경 => Button 비활성화
  // setTiemout 이용하여 5초 후 Button 활성화
  useEffect(() => {
    setButtonState(false);
    setTimeout(() => {
      setButtonState(true);
    }, 7500);
  }, [params]);

  // downloadPdf 함수에 Click 방지
  // PdfState를 true로 변경함으로 화면 Capture를 시작
  const downloadPdf = () => {
    setPreventClick(true);
    setPdfState(true);
  };
  // console.log(pdfState);

  // Capture를 진행하는 4개의 Componenet에서 Image 경로를 저장
  // PDP에 Image와 Text로 구성 후 Download 실행
  // Download 실행 후, Capture State를 false로 변경함으로써 params가 변경되었을시, 다시 Download Process를 실행할 수 있도록 상태 변경
  useEffect(() => {
    if (
      data1State === true &&
      data2State === true &&
      data3State === true &&
      textMiningState === true
    ) {
      const pdfHead = `Report for "${params.nationCode}" from ${durationList[0].startY}.${durationList[0].startM} to ${durationList[0].endY}.${durationList[0].endM}`;
      const pdfData1 = `1. Export & Import Proportion`;
      const data1Comment = `  - The following graphs illustrate the current status of exports and imports between Korea and "${
        params.nationCode
      }",\n
    presenting both the monetary value and weight proportion of each item.\n
  - The total amount of exports is ${pdfData1Comment.expdlrSum
    .toString()
    .replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}$, the total amount of imports is ${pdfData1Comment.impdlrSum
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$,\n
    and the balance of trade is ${pdfData1Comment.balpaymentsDlr
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$.`;
      const pdfData2 = `2. Export & Import TOP5 Country`;
      const pdfPage1 = "- 1 -";
      const data2Comment = `  - The graphs below show the top 5 items for exports and imports listed in descending order,\n
     with units in millions of dollars.`;
      const pdfData3 = `3. Detail Statistics about "${params.nationCode}"`;
      const textMining = `4. TextMining`;
      const pdfPage2 = "- 2 -";
      // PDF File 생성
      const pdf = new jsPDF();
      // Head
      pdf.setFontSize(20);
      pdf.text(pdfHead, 10, 15);
      // Data1
      pdf.setFontSize(15);
      pdf.text(pdfData1, 10, 30);
      pdf.addImage(data1Img, "JPEG", 0, 35, 200, 80);
      pdf.setFontSize(10);
      pdf.text(data1Comment, 17, 120);
      // Data2
      pdf.setFontSize(15);
      pdf.text(pdfData2, 10, 160);
      pdf.addImage(data2Img, "JPEG", 0, 165, 200, 80);
      pdf.setFontSize(10);
      pdf.text(data2Comment, 17, 255);
      // Pagination
      pdf.text(pdfPage1, 100, 290);
      pdf.addPage("a4");
      // Data3
      pdf.setFontSize(15);
      pdf.text(pdfData3, 10, 15);
      pdf.addImage(data3Img, "JPEG", 5, 20, 200, 150);
      // TextMinig
      pdf.setFontSize(15);
      pdf.text(textMining, 10, 190);
      pdf.addImage(textMiningImg, "JPEG", 50, 195, 110, 90);
      // Pagination
      pdf.text(pdfPage2, 100, 290);
      // PDF Save
      pdf.save(`Report_${params.nationCode}_${params.duration}`);
      setPdfState(false);
      setData1State(false);
      setData2State(false);
      setData3State(false);
      setTextMiningState(false);
      setTimeout(() => {
        setPreventClick(false);
      }, 100);
    }
  }, [data1State, data2State, data3State, textMiningState]);
  // console.log(pdfState);
  // console.log(preventClick);

  return (
    <>
      {buttonState === false ? (
        <button onClick={downloadPdf} disabled={!buttonState}>
          <img src={pdf} className="grayscale w-10 h-10 mr-5" />
        </button>
      ) : (
        <button onClick={downloadPdf} disabled={!buttonState}>
          <img src={pdf} className="w-10 h-10 mr-5" />
        </button>
      )}
      {/* <button onClick={downloadPdf}>
        <img src={pdf} className=" w-10 h-10 mr-5" />
      </button> */}
    </>
  );
}

export default Pdf;
