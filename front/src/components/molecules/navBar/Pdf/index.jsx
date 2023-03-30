import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import pdf from "../../../../assets/pdf.svg";
import Code from "../../../../assets/Code.json";
import { useParams } from "react-router-dom";

const nationState = [];
for (let i = 3; i < Code.국가코드.length; i++) {
  nationState.push({
    nationCode: Code.국가코드[i].Column1,
    nationName: Code.국가코드[i].Column2,
  });
}
console.log(nationState);

function Pdf() {
  const params = useParams();

  const pdfText = `Nation : ${params.nationCode}, Duration : ${params.duration}`;

  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.text(pdfText, 10, 10);
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
