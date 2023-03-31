import React, {useState, useEffect} from 'react';
import * as XLSX from 'xlsx';
import excel from "../../../../assets/excel.svg";
// import tradeData from "../../../../assets/trade_data.json";
// import tradeData from "./trade_data.json";
import tradeData1 from "./exelData1.json";
import tradeData2 from "./exelData2.json";
import tradeData3 from "./exelData3.json";

function Excel() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  function convertData2ToTable(data1, data2) {
    const table = [
      ["nation", data1.nationName],
      ["period", data1.period],
      [],
      ['expdlrSum', 'impdlrSum', 'balpaymentsLr', 'expwgtSum', 'impwgtSum', 'balpaymentsWgt'],
      [data1.expdlrSum, data1.impdlrSum, data1.balpaymentsLr, data1.expwgtSum, data1.impwgtSum, data1.balpaymentsWgt],  
    ];
  
    // Add a blank row between the tables
    table.push([]);
    table.push(['item', 'exppdlrSum', 'changeRate1', 'changeRate2', 'export1', 'export2']);
  
    // Add exportTop data to the table
    Object.keys(data2.exportTop).forEach((key) => {
      const topItem = data2.exportTop[key];
      table.push([
        key,
        topItem.exppdlrSum,
        topItem.exportChange.changeRate[0],
        topItem.exportChange.changeRate[1],
        topItem.exportChange["2023.01"],
        topItem.exportChange["2023.02"],
      ]);
    });
  
    return table;
  }
  
  function convertData3ToTable(data) {
    const table = [
      ['period', data.period],
      [],
      ['Export Detail', 'ranking', 'nationName', 'expdlrSum', 'expdlrRatio', 'expwgtSum', 'expwgtRatio', 'hsCode','',
       'Import Detail', 'ranking', 'nationName', 'expdlrSum', 'expdlrRatio', 'expwgtSum', 'expwgtRatio', 'hsCode',],
    ];
  
    // Add exportDetail data to the table
    const exportDetailKeys = Object.keys(data.exportDetail);
    for (let i = 0; i < exportDetailKeys.length; i++) {
      const key = exportDetailKeys[i];
      const detail = data.exportDetail[key];

      // when table is undefined, creat new row
      if (!table[i + 3]) {
        table[i + 3] = [];
      }
      // add push 
      table[i + 3].push(
        key,
        detail.ranking,
        detail.nationName,
        detail.expdlrSum,
        detail.expdlrRatio,
        detail.expwgtSum,
        detail.expwgtRatio,
        detail.hsCode,
      );
    }

    // Add a blank column between the tables
    for (let i = 3; i < table.length; i++) {
      table[i].push('');
    }
  
    // Add a blank column between the tables
    const importDetailKeys = Object.keys(data.importDetail);
    for (let i = 0; i < importDetailKeys.length; i++) {
      const key = importDetailKeys[i];
      const detail = data.importDetail[key];

      if (!table[i + 3]) {
        table[i + 3] = [];
      }
      table[i + 3].push(
        key,
        detail.ranking,
        detail.nationName,
        detail.impdlrSum,
        detail.impdlrRatio,
        detail.impwgtSum,
        detail.impwgtRatio,
        detail.hsCode,
      );
    }
  
    return table;
  }
  

  useEffect(() => {
    setData1(tradeData1);
    setData2(tradeData2);
    setData3(tradeData3);
  }, []);

  const exportToExcel = () => {
    const ws1 = XLSX.utils.aoa_to_sheet(convertData2ToTable(data1, data2));
    const ws2 = XLSX.utils.aoa_to_sheet(convertData3ToTable(data3));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, '수출입 비중 & top 5');
    XLSX.utils.book_append_sheet(wb, ws2, '수출입 상세');
    XLSX.writeFile(wb, '보고서.xlsx');
  };

  return (
    <button onClick={exportToExcel} >
        <img src={excel} className="w-10 h-10" />
    </button>
  );
}

export default Excel;