import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DataThirdI from "../../organism/DataThirdI";
import NavBarI from "../../organism/NavBarI";
import WorldMapI from "../../organism/WorldMapI";
import NewsTextMiningI from "../../organism/NewsTextMiningI";
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
      <NewsTextMiningI />
    </>
  );
}

export default Item;
