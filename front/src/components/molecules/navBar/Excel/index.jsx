import * as XLSX from "xlsx";
import excel from "../../../../assets/excel.svg";
import { useRecoilValue } from "recoil";
import {
  excelState1,
  excelState2,
  excelState3,
  excelStateI1,
  excelStateI2,
  excelStateI3,
} from "../../../../states/Excel";

function Excel(props) {
  const filename =
    props.state === "Nation" ? "국가별_데이터.xlsx" : "품목별_데이터.xlsx";

  const data1 = useRecoilValue(excelState1);
  const data2 = useRecoilValue(excelState2);
  const data3 = useRecoilValue(excelState3);

  const dataI1 = useRecoilValue(excelStateI1);
  const dataI2 = useRecoilValue(excelStateI2);
  const dataI3 = useRecoilValue(excelStateI3);

  function convertData2ToTable(data1, data2) {
    const table = [
      ["nation", data1.nationName],
      ["period", data1.period],
      [],
      [
        "expdlrSum",
        "impdlrSum",
        "balpaymentsDlr",
        "expwgtSum",
        "impwgtSum",
        "balpaymentsWgt",
      ],
      [
        data1.expdlrSum,
        data1.impdlrSum,
        data1.balpaymentsDlr,
        data1.expwgtSum,
        data1.impwgtSum,
        data1.balpaymentsWgt,
      ],
    ];

    // Add exportTop data to the table
    table.push([], ["수출 top5"], ["item", "date", "expDlr"]);
    const dates = Object.keys(data2.expdlrChange).filter(
      (key) => key !== "changeRate"
    );

    Object.keys(data2.exportTop).forEach((key) => {
      const topItem = data2.exportTop[key];
      const expChange = topItem.exportChange;
      const itemRow = [key];
      const dateRow = [dates[0]];
      const expDlrRow = [expChange[dates[0]]];

      // iterate over the dates and push date and expDlr to the table except the first date
      for (let i = 1; i < dates.length; i++) {
        itemRow[i] = "";
        dateRow[i] = dates[i];
        expDlrRow[i] = expChange[dates[i]];
      }
      // push item, date, expDlr to the table
      for (let i = 0; i < itemRow.length; i++) {
        table.push([itemRow[i], dateRow[i], expDlrRow[i]]);
      }
      table.push(["expdlrSum", "", topItem.expdlrSum]);
    });

    // Add exportTop data to the table
    table.push([], ["수입 top5"], ["item", "date", "impDlr"]);

    Object.keys(data2.importTop).forEach((key) => {
      const topItem = data2.importTop[key];
      const impChange = topItem.importChange;
      const itemRow = [key];
      const dateRow = [dates[0]];
      const impDlrRow = [impChange[dates[0]]];

      // iterate over the dates and push date and impDlr to the table except the first date
      for (let i = 1; i < dates.length; i++) {
        itemRow[i] = "";
        dateRow[i] = dates[i];
        impDlrRow[i] = impChange[dates[i]];
      }
      // push item, date, impDlr to the table
      for (let i = 0; i < itemRow.length; i++) {
        table.push([itemRow[i], dateRow[i], impDlrRow[i]]);
      }
      table.push(["impdlrSum", "", topItem.impdlrSum]);
    });

    return table;
  }

  function convertDataI2ToTable(data1, data2) {
    const table = [
      ["item", data1.itemName],
      ["period", data1.period],
      [],
      [
        "expdlrSum",
        "impdlrSum",
        "balpaymentsDlr",
        "expwgtSum",
        "impwgtSum",
        "balpaymentsWgt",
      ],
      [
        data1.expdlrSum,
        data1.impdlrSum,
        data1.balpaymentsDlr,
        data1.expwgtSum,
        data1.impwgtSum,
        data1.balpaymentsWgt,
      ],
    ];

    // Add exportTop data to the table
    table.push([], ["수출 top5"], ["nation", "date", "expDlr"]);
    const dates = Object.keys(data2.expdlrChange).filter(
      (key) => key !== "changeRate"
    );

    Object.keys(data2.exportTop).forEach((key) => {
      const topNation = data2.exportTop[key];
      const expChange = topNation.exportChange;
      const nationRow = [key];
      const dateRow = [dates[0]];
      const expDlrRow = [expChange[dates[0]]];

      // iterate over the dates and push date and expDlr to the table except the first date
      for (let i = 1; i < dates.length; i++) {
        nationRow[i] = "";
        dateRow[i] = dates[i];
        expDlrRow[i] = expChange[dates[i]];
      }
      // push item, date, expDlr to the table
      for (let i = 0; i < nationRow.length; i++) {
        table.push([nationRow[i], dateRow[i], expDlrRow[i]]);
      }
      table.push(["expdlrSum", "", topNation.expdlrSum]);
    });

    // Add exportTop data to the table
    table.push([], ["수입 top5"], ["Nation", "date", "impDlr"]);

    Object.keys(data2.importTop).forEach((key) => {
      const topNation = data2.importTop[key];
      const impChange = topNation.importChange;
      const nationRow = [key];
      const dateRow = [dates[0]];
      const impDlrRow = [impChange[dates[0]]];

      // iterate over the dates and push date and impDlr to the table except the first date
      for (let i = 1; i < dates.length; i++) {
        nationRow[i] = "";
        dateRow[i] = dates[i];
        impDlrRow[i] = impChange[dates[i]];
      }
      // push item, date, impDlr to the table
      for (let i = 0; i < nationRow.length; i++) {
        table.push([nationRow[i], dateRow[i], impDlrRow[i]]);
      }
      table.push(["impdlrSum", "", topNation.impdlrSum]);
    });

    return table;
  }

  function convertData3ToTable(data) {
    const table = [
      ["period", data.period],
      [],
      [
        "Export Detail",
        "ranking",
        "nationName",
        "expdlrSum",
        "expdlrRatio",
        "expwgtSum",
        "expwgtRatio",
        "hsCode",
        "",
        "Import Detail",
        "ranking",
        "nationName",
        "expdlrSum",
        "expdlrRatio",
        "expwgtSum",
        "expwgtRatio",
        "hsCode",
      ],
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
        detail.hsCode
      );
    }

    // Add a blank column between the tables
    for (let i = 3; i < table.length; i++) {
      table[i].push("");
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
        detail.hsCode
      );
    }

    return table;
  }

  const exportToExcel = () => {
    const ws1 = XLSX.utils.aoa_to_sheet(convertData2ToTable(data1, data2));
    const ws2 = XLSX.utils.aoa_to_sheet(convertData3ToTable(data3));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "수출입 비중 & top 5");
    XLSX.utils.book_append_sheet(wb, ws2, "수출입 상세");
    XLSX.writeFile(wb, filename);
  };

  const exportToExcelI = () => {
    const wsI1 = XLSX.utils.aoa_to_sheet(convertDataI2ToTable(dataI1, dataI2));
    const wsI2 = XLSX.utils.aoa_to_sheet(convertData3ToTable(dataI3));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsI1, "수출입 비중 & top 5");
    XLSX.utils.book_append_sheet(wb, wsI2, "수출입 상세");
    XLSX.writeFile(wb, filename);
  };

  return props.state == "Nation" ? (
    <button onClick={exportToExcel}>
      <img src={excel} className="w-10 h-10" />
    </button>
  ) : (
    <button onClick={exportToExcelI}>
      <img src={excel} className="w-10 h-10" />
    </button>
  );
}

export default Excel;
