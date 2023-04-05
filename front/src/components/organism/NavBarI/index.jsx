import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./../../../assets/logo.svg";
import pdf from "./../../../assets/pdf.svg";
import excel from "./../../../assets/excel.svg";
import NationOrItemI from "./../../molecules/navBar/NationalOrItemI";
import ItemSelector from "../../molecules/navBar/ItemSelector";
import ViewPeriodI from "./../../molecules/navBar/ViewPeriodI";
import PdfI from "../../molecules/navBar/PdfI";

import Excel from "./../../molecules/navBar/Excel/index";

function NavBarI() {
  const navigate = useNavigate();
  // Nation, Item의 state에서 Default를 Nation으로 설정
  const [state, setState] = useState("Item");

  // stateHandler라는 함수를 사용하여 state를 이용
  const stateHandler = (event) => {
    setState(event);
  };

  const params = useParams();

  return (
    <>
      <nav className="flex justify-between  sticky top-0 bg-slate-200 content-center font-mun">
        <button
          onClick={() => {
            navigate("/nation/ALL/202203-202302");
          }}
        >
          <img src={logo} className="w-32 h-32 ml-10" />
        </button>

        <div className="content-center flex items-center">
          <NationOrItemI stateHandler={stateHandler} />
        </div>

        <div className="content-center flex items-center text-2xl">
          <ItemSelector />
          {params.hsCode}
        </div>

        <div className="flex flex-inline items-center text-2xl ml-5">
          <ViewPeriodI />
        </div>

        <div className="flex justify-between items-center align-middle mr-10">
          <PdfI />
          <Excel state={state} />
        </div>
      </nav>
    </>
  );
}

export default NavBarI;
