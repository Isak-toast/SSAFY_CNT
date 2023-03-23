import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import Table from "../../molecules/dataThird/Table";
import { AvatarCell } from "../../molecules/dataThird/Table";
import ExportImportToggle from "../../molecules/dataThird/ExportImportToggle";

function DataThird() {
  const [exportImportState, setExportImportState] = useState(true);

  const exportImportStateHandler = () => {
    setExportImportState(!exportImportState);
  };
  // const getData = () => {
  //   const data = [];
  //   return [...data, ...data, ...data];
  // };
  const columns = useMemo(
    () => [
      { accessor: "order", Header: "순위" },
      {
        accessor: "nation",
        Header: "국가코드",
        Cell: AvatarCell,
      },
      { accessor: "date", Header: "조회기준" },
      { accessor: "amount", Header: "금액($)" },
      { accessor: "amountPortion", Header: "점유율(금액)" },
      { accessor: "weight", Header: "중량(kg)" },
      { accessor: "weightPortion", Header: "점유율(중량)" },
      { accessor: "hsCode", Header: "품목코드(HS코드)" },
    ],
    []
  );

  const data = useMemo(
    () =>
      Array(100)
        .fill()
        .map(() => ({
          order: faker.datatype.number({ min: 1, max: 10 }),
          nation: faker.address.countryCode(),
          // imgSrc:
          //   "./../../../../../assets/nationalFlags/" +
          //   faker.address.countryCode() +
          //   ".gif",
          date: "2022.3 - 2023.3",
          amount: faker.commerce.price(0, 100000000, 0, "$"),
          amountPortion: "11%",
          weight: faker.datatype.number({ min: 100000 }),
          weightPortion: "11%",
          hsCode: "전체품목",
        })),
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex-start" onClick={exportImportStateHandler}>
          <ExportImportToggle exportImportState={exportImportState} />
        </div>

        <div className="mt-4">
          <Table
            columns={columns}
            data={data}
            exportImportState={exportImportState}
          />
        </div>
      </main>
    </div>
  );
}

export default DataThird;
