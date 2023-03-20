import React, { useMemo } from "react";
import { faker } from "@faker-js/faker";
import Select from "react-select";

faker.seed(100);
faker.locale = "ko";

function NationSelector() {
  const options = [
    { value: "가나", label: "가나" },
    { value: "가봉", label: "가봉" },
    { value: "미국", label: "미국" },
  ];
  // const options = useMemo(
  //   () =>
  //     Array(100)
  //       .fill()
  //       .map(() => ({
  //         nation: faker.address.countryCode(),
  //       })),
  //   []
  // );

  // console.log(data);

  return (
    <div>
      <Select options={options} placeholder="전세계" />
    </div>
  );
}

export default NationSelector;
