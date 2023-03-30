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
      <nav className="flex justify-between  sticky top-0 bg-slate-200 content-center font-mun">
        <img src={logo} className="w-32 h-32 ml-10" />

        <div className="content-center flex items-center">
          <NationOrItemI stateHandler={stateHandler} />
        </div>

        {/* {state === "Nation" ? ( */}
        <div className="content-center flex items-center">
          <ItemSelector />
          {params.hsCode}
        </div>

        {/* // ) : null} */}
        {/* // {state === "Item" ? <ItemSelector /> : null} */}

        <div className="flex flex-inline items-center text-2xl ml-5">
          <ViewPeriodI />
        </div>

        <div className="flex justify-between items-center align-middle mr-10">
          <img src={pdf} className="w-10 h-10 mr-5" />
          <img src={excel} className="w-10 h-10" />
        </div>
      </nav>
    </>
  );
}

export default NavBarI;
