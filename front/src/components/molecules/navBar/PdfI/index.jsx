import React from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import pdf from "../../../../assets/pdf.svg";
import Code from "../../../../assets/Code.json";
import { useRecoilValue } from "recoil";
import {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
} from "../../../../states/recoilPdfState";

function PdfI() {
  const data1Img = useRecoilValue(data1ImgAtom);
  // const data2Img = useRecoilValue(data2ImgAtom);
  // const data3Img = useRecoilValue(data3ImgAtom);
  const textMiningImg = useRecoilValue(textMiningImgAtom);
  // console.log(data1Img);
  // console.log(data2Img);
  // console.log(data3Img);
  // console.log(textMiningImg);

  const params = useParams();

  const pdfText = `HsCode : ${params.hsCode}, Duration : ${params.duration}`;

  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.text(pdfText, 10, 10);
    pdf.addImage(data1Img, "JPEG", 0, 20);
    // pdf.addImage(data2Img, "JPEG", 0, 100);
    // pdf.addImage(data3Img, "JPEG", 0, 200);
    pdf.addImage(textMiningImg, "JPEG", 0, 40);
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
