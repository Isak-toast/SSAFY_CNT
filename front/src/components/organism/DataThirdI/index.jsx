import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ExportImportToggle from "../../molecules/dataThird/ExportImportToggle";
import Table from "../../molecules/dataThirdI/Table";
import { AvatarCell } from "../../molecules/dataThird/Table";
import axios from "axios";
import { faker } from "@faker-js/faker";
function DataThirdI(props) {
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
    { accessor: "expdlrRatio", Header: " 금액 점유율(%)" },
    { accessor: "expwgtSum", Header: "중량(kg)" },
    { accessor: "expwgtRatio", Header: "중량 점유율(%)" },
    { accessor: "hsCode", Header: "품목코드(HS코드)" },
  ]);

  // const imColumns = useMemo(() => [
  //   { accessor: "ranking", Header: "순위" },
  //   {
  //     accessor: "nationCode",
  //     Header: "국가코드",
  //     Cell: AvatarCell,
  //   },
  //   { accessor: "duration", Header: "조회기준" },
  //   { accessor: "impdlrSum", Header: "금액($)" },
  //   { accessor: "impdlrRatio", Header: "금액 점유율(%)" },
  //   { accessor: "impwgtSum", Header: "중량(kg)" },
  //   { accessor: "impwgtRatio", Header: "중량 점유율(%)" },
  //   { accessor: "hsCode", Header: "품목코드(HS코드)" },
  // ]);

  // const [imData, setImData] = useState([]);

  // const imDataHandler = (data) => {
  //   const temp = [];
  //   for (let objKey in data["importDetail"]) {
  //     data["importDetail"][objKey]["nationCode"] = objKey;
  //     data["importDetail"][objKey]["duration"] = data["period"];

  //     let num = data["importDetail"][objKey]["impdlrRatio"]
  //       .toString()
  //       .split(".");

  //     data["importDetail"][objKey]["impdlrRatio"] =
  //       num[0] + "." + num[1].slice(0, 1);

  //     num = data["importDetail"][objKey]["impwgtRatio"].toString().split(".");

  //     data["importDetail"][objKey]["impwgtRatio"] =
  //       num[0] + "." + num[1].slice(0, 1);

  //     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //     num = data["importDetail"][objKey]["impdlrSum"].toLocaleString();
  //     data["importDetail"][objKey]["impdlrSum"] = num;

  //     num = data["importDetail"][objKey]["impwgtSum"].toLocaleString();
  //     data["importDetail"][objKey]["impwgtSum"] = num;

  //     temp.push(data["importDetail"][objKey]);
  //   }

  //   setImData(temp);
  // };

  // const [exData, setExData] = useState([]);

  // const exDataHandler = (data) => {
  //   const temp = [];
  //   for (let objKey in data["exportDetail"]) {
  //     data["exportDetail"][objKey]["nationCode"] = objKey;
  //     data["exportDetail"][objKey]["duration"] = data["period"];

  //     let num = data["exportDetail"][objKey]["expdlrRatio"]
  //       .toString()
  //       .split(".");

  //     data["exportDetail"][objKey]["expdlrRatio"] =
  //       num[0] + "." + num[1].slice(0, 1);

  //     num = data["exportDetail"][objKey]["expwgtRatio"].toString().split(".");

  //     data["exportDetail"][objKey]["expwgtRatio"] =
  //       num[0] + "." + num[1].slice(0, 1);

  //     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //     num = data["exportDetail"][objKey]["expdlrSum"].toLocaleString();
  //     data["exportDetail"][objKey]["expdlrSum"] = num;

  //     num = data["exportDetail"][objKey]["expwgtSum"].toLocaleString();
  //     data["exportDetail"][objKey]["expwgtSum"] = num;

  //     temp.push(data["exportDetail"][objKey]);
  //   }

  //   setExData(temp);
  // };

  ///////여기에서 axios 쓴다
  useEffect(() => {
    // console.log("세부정보~~~~~~~~~~", params);
  }, [duration]);

  const exportImportStateHandler = () => {
    setExportImportState(!exportImportState);
  };

  const data = useMemo(
    () =>
      Array(100)
        .fill()
        .map(() => ({
          ranking: faker.datatype.number({ min: 1, max: 10 }),
          nationCode: faker.address.countryCode(),
          // imgSrc:
          //   "./../../../../../assets/nationalFlags/" +
          //   faker.address.countryCode() +
          //   ".gif",
          duration: "2022.3 - 2023.3",
          expdlrSum: faker.commerce.price(0, 100000000, 0, "$"),
          expdlrRatio: "11%",
          expwgtSum: faker.datatype.number({ min: 100000 }),
          expwgtRatio: "11%",
          hsCode: "전체품목",
        })),
    []
  );

  return (
    <>
      <hr className="mt-3"></hr>
      <div onClick={exportImportStateHandler} className="mt-5 left-0">
        <ExportImportToggle
          exportImportState={exportImportState}
          params={params}
        />
      </div>
      <div className="min-h-screen mt-5 text-gray-900">
        <main className="mx-10 my-5">
          <div className="mt-2">
            <Table
              columns={exColumns}
              data={data}
              exportImportState={exportImportState}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default DataThirdI;
