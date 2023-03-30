import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DataThirdI from "../../organism/DataThirdI";
import NavBarI from "../../organism/NavBarI";
import WorldMapI from "../../organism/WorldMapI";
function Item() {
  return (
    <>
      <div className="z-30 sticky top-0">
        <NavBarI />
      </div>
      <div className="z-0">
        <WorldMapI />
      </div>
      <DataThirdI />
    </>
  );
}

export default Item;
