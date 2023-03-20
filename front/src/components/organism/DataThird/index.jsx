import { useMemo } from "react";
import { faker } from "@faker-js/faker";
import Table from "../../molecules/dataThird/Table";
import { AvatarCell } from "../../molecules/dataThird/Table";

// faker.seed(100);
// faker.locale = "ko";

function DataThird() {
  const columns = useMemo(
    () => [
      { accessor: "order", Header: "순위" },
      {
        accessor: "nation",
        Header: "국가코드",
        Cell: AvatarCell,
      },
      { accessor: "date", Header: "조회기준" },
      { accessor: "amount", Header: "수입금액($)" },
      { accessor: "amountPortion", Header: "점유율(금액)" },
      { accessor: "weight", Header: "수입중량(kg)" },
      { accessor: "weightPortion", Header: "점유율(중량)" },
      { accessor: "hsCode", Header: "품목코드HS코드" },
    ],
    []
  );

  const data = useMemo(
    () =>
      Array(30)
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

  return <Table columns={columns} data={data} />;
}

export default DataThird;
