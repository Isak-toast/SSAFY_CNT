import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "./../../../assets/logo.svg";
import pdf from "./../../../assets/pdf.svg";
import excel from "./../../../assets/excel.svg";
import NationOrItemI from "./../../molecules/navBar/NationalOrItemI";
import ItemSelector from "../../molecules/navBar/ItemSelector";
import ViewPeriodI from "./../../molecules/navBar/ViewPeriodI";

function NavBarI() {
  // Nation, Item의 state에서 Default를 Nation으로 설정
  const [state, setState] = useState("Item");

  // stateHandler라는 함수를 사용하여 state를 이용
  const stateHandler = (event) => {
    setState(event);
  };

  const params = useParams();
  //   const src =
  //     "./../../../../assets/nationalFlags/" + params.hsCode + ".gif";
  //   const onErrorImg = (e) => {
  //     e.target.src = unImg;
  //   };

  return (
    <>
      <nav className="flex justify-between  sticky top-0 bg-slate-200 content-center">
        <img src={logo} className="w-20 h-20 ml-5 mt-2" />

        <div className="content-center mt-4">
          <NationOrItemI stateHandler={stateHandler} />
        </div>

        {/* {state === "Nation" ? ( */}
        <div className="mt-5">
          {params.hsCode}
          <ItemSelector />
        </div>

        {/* // ) : null} */}
        {/* // {state === "Item" ? <ItemSelector /> : null} */}

        <div className="mt-5">
          <ViewPeriodI />
        </div>

        <div className="flex justify-between align-middle mr-5 mt-4">
          <img src={pdf} className="w-10 h-10 mr-5" />
          <img src={excel} className="w-10 h-10" />
        </div>
      </nav>
    </>
  );
}

export default NavBarI;
