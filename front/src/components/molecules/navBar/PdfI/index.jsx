import React from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import pdf from "../../../../assets/pdf.svg";
import { useRecoilValue } from "recoil";
import {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
} from "../../../../states/recoilPdfState";

function PdfI() {
  const data1Img = useRecoilValue(data1ImgAtom);
  const data2Img = useRecoilValue(data2ImgAtom);
  const data3Img = useRecoilValue(data3ImgAtom);
  const textMiningImg = useRecoilValue(textMiningImgAtom);
  // console.log(data1Img);
  // console.log(data2Img);
  // console.log(data3Img);
  // console.log(textMiningImg);

  const params = useParams();

  const pdfHead = `HsCode : ${params.hsCode}, Duration : ${params.duration}`;
  const pdfData1 = `1. Export & Import Proportion`;
  const pdfData2 = `2. Export & Import TOP5 Country`;
  const pdfPage1 = "- 1 -";
  const pdfData3 = `3. Detail Statistics about ${params.hsCode}`;

  const downloadPdf = () => {
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
  };

  return (
    <>
      <button onClick={downloadPdf}>
        <img src={pdf} className="w-10 h-10 mr-5" />
      </button>
    </>
  );
}

export default PdfI;
