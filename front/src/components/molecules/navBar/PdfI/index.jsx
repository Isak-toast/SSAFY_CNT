import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import pdf from "../../../../assets/pdf.svg";
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
} from "../../../../states/recoilPdfState";

function PdfI() {
  // buttonState를 이용하여 화면 Rendering 시작 5초 후에 Button 활성화
  const [buttonState, setButtonState] = useState(false);

  // Capture한 Image 경로 저장
  const data1Img = useRecoilValue(data1ImgAtom);
  const data2Img = useRecoilValue(data2ImgAtom);
  const data3Img = useRecoilValue(data3ImgAtom);
  const textMiningImg = useRecoilValue(textMiningImgAtom);

  // pdfStateAtom을 이용하여 pdfState가 true일 경우에만 화면 Image를 Capture
  const [pdfState, setPdfState] = useRecoilState(pdfStateAtom);
  // console.log(pdfState);

  // data1StateAtom, data2StateAtom, data3StateAtom, textMiningStateAtom을 이용하여 Rendering 이후 Capture한 화면의 Image 경로를 저장하고 상태를 변경
  const [data1State, setData1State] = useRecoilState(data1StateAtom);
  const [data2State, setData2State] = useRecoilState(data2StateAtom);
  const [data3State, setData3State] = useRecoilState(data3StateAtom);
  const [textMiningState, setTextMiningState] =
    useRecoilState(textMiningStateAtom);
  // console.log(data1State, data2State, data3State, textMiningState);

  // preventClickAtom을 이용하여 화면 Capture Image 경로 저장 시 NavBar와 WorldMap의 Clcik을 방지
  const [preventClick, setPreventClick] = useRecoilState(preventClickAtom);

  // setTimeout(() => {
  //   setPdfState(true);
  //   // console.log("Finish");
  // }, 10000);

  const params = useParams();

  useEffect(() => {
    setButtonState(false);
    setTimeout(() => {
      setButtonState(true);
    }, 5000);
  }, [params]);

  const pdfHead = `HsCode : ${params.hsCode}, Duration : ${params.duration}`;
  const pdfData1 = `1. Export & Import Proportion`;
  const pdfData2 = `2. Export & Import TOP5 Country`;
  const pdfPage1 = "- 1 -";
  const pdfData3 = `3. Detail Statistics about ${params.hsCode}`;

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
      const pdf = new jsPDF();
      pdf.text(pdfHead, 10, 10);
      pdf.text(pdfData1, 10, 30);
      pdf.addImage(data1Img, "JPEG", 0, 45, 200, 80);
      pdf.text(pdfData2, 10, 160);
      pdf.addImage(data2Img, "JPEG", 0, 175, 200, 80);
      pdf.text(pdfPage1, 100, 290);
      pdf.addPage("a4");
      pdf.text(pdfData3, 10, 30);
      pdf.addImage(data3Img, "JPEG", 5, 35, 200, 150);
      pdf.addImage(textMiningImg, "JPEG", 10, 180, 100, 100);
      pdf.save(`Report_${params.hsCode}_${params.duration}`);
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
    </>
  );
}

export default PdfI;
