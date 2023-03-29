import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../../molecules/dataThird/Table";
import { AvatarCell } from "../../molecules/dataThird/Table";
import ExportImportToggle from "../../molecules/dataThird/ExportImportToggle";
import axios from "axios";

function DataThird() {
  const [exportImportState, setExportImportState] = useState(true);
  const params = useParams();
  const duration = params.duration;

  const exColumns = useMemo(() => [
    { accessor: "ranking", Header: "순위" },
    {
      accessor: "nationCode",
      Header: "국가코드",
      Cell: AvatarCell,
    },
    { accessor: "duration", Header: "조회기준" },
    { accessor: "expdlrSum", Header: "금액($)" },
    { accessor: "expdlrRatio", Header: "점유율(금액)" },
    { accessor: "expwgtSum", Header: "중량(kg)" },
    { accessor: "expwgtRatio", Header: "점유율(중량)" },
    { accessor: "hsCode", Header: "품목코드(HS코드)" },
  ]);

  const imColumns = useMemo(() => [
    { accessor: "ranking", Header: "순위" },
    {
      accessor: "nationCode",
      Header: "국가코드",
      Cell: AvatarCell,
    },
    { accessor: "duration", Header: "조회기준" },
    { accessor: "impdlrSum", Header: "금액($)" },
    { accessor: "impdlrRatio", Header: "점유율(금액)" },
    { accessor: "impwgtSum", Header: "중량(kg)" },
    { accessor: "impwgtRatio", Header: "점유율(중량)" },
    { accessor: "hsCode", Header: "품목코드(HS코드)" },
  ]);

  const [imData, setImData] = useState([]);

  const imDataHandler = (data) => {
    const temp = [];
    for (let objKey in data["importDetail"]) {
      data["importDetail"][objKey]["nationCode"] = objKey;
      data["importDetail"][objKey]["duration"] = data["period"];
      temp.push(data["importDetail"][objKey]);
    }

    setImData(temp);
  };

  const [exData, setExData] = useState([]);

  const exDataHandler = (data) => {
    const temp = [];
    for (let objKey in data["exportDetail"]) {
      data["exportDetail"][objKey]["nationCode"] = objKey;
      data["exportDetail"][objKey]["duration"] = data["period"];
      temp.push(data["exportDetail"][objKey]);
    }

    setExData(temp);
  };

  ///////여기에서 axios 쓴다
  useEffect(() => {
    axios
      .get(
        "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/data3?" +
          "startDate=" +
          params.duration.substring(0, 6) +
          "&" +
          "endDate=" +
          params.duration.substring(7, 12)
      )
      .then((response) => {
        exDataHandler(response.data);
        imDataHandler(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [duration]);

  const exportImportStateHandler = () => {
    setExportImportState(!exportImportState);
  };

  // const data = useMemo(
  //   () =>
  //     Array(100)
  //       .fill()
  //       .map(() => ({
  //         ranking: faker.datatype.number({ min: 1, max: 10 }),
  //         nationCode: faker.address.countryCode(),
  //         // imgSrc:
  //         //   "./../../../../../assets/nationalFlags/" +
  //         //   faker.address.countryCode() +
  //         //   ".gif",
  //         duration: "2022.3 - 2023.3",
  //         expdlrSum: faker.commerce.price(0, 100000000, 0, "$"),
  //         expdlrRatio: "11%",
  //         expwgtSum: faker.datatype.number({ min: 100000 }),
  //         expwgtRatio: "11%",
  //         hsCode: "전체품목",
  //       })),
  //   []
  // );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex-start" onClick={exportImportStateHandler}>
          <ExportImportToggle
            exportImportState={exportImportState}
            params={params}
          />
        </div>

        {exportImportState === true ? (
          <div className="mt-2">
            <Table
              columns={exColumns}
              data={exData}
              exportImportState={exportImportState}
            />
          </div>
        ) : (
          <div className="mt-2">
            <Table
              columns={imColumns}
              data={imData}
              exportImportState={exportImportState}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default DataThird;
