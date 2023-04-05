import React from "react";
import jsPDF from "jspdf";
import pdf from "../../../../assets/pdf.svg";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
} from "../../../../states/recoilPdfState";

function Pdf() {
  const data1Img = useRecoilValue(data1ImgAtom);
  const data2Img = useRecoilValue(data2ImgAtom);
  const data3Img = useRecoilValue(data3ImgAtom);
  const textMiningImg = useRecoilValue(textMiningImgAtom);
  // console.log(data1Img);
  // console.log(data2Img);
  // console.log(data3Img);
  // console.log(textMiningImg)

  const params = useParams();

  const pdfText = `Nation : ${params.nationCode}, Duration : ${params.duration}`;

  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.text(pdfText, 10, 10);
    pdf.addImage(data1Img, "JPEG", 0, 20);
    pdf.addImage(data2Img, "JPEG", 0, 50);
    pdf.addImage(data3Img, "JPEG", 0, 80);
    pdf.addImage(textMiningImg, "JPEG", 0, 100);
    pdf.save(`Report_${params.nationCode}_${params.duration}`);
  };

  return (
    <>
      <button onClick={downloadPdf}>
        <img src={pdf} className="w-10 h-10 mr-5" />
      </button>
    </>
  );
}

export default Pdf;
