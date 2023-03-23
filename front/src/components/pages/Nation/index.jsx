import React from "react";

import NavBar from "../../organism/NavBar";

import DataFirst from "../../organism/DataFirst";
import DataSecond from "../../organism/DataSecond";
import DataThird from "../../organism/DataThird/index";
import WorldMap from "../../organism/WorldMap";

function Nation() {
  return (
    <>
      <NavBar />

      <WorldMap />
      <DataFirst />
      <DataSecond />
      <DataThird />
    </>
  );
}

export default Nation;
