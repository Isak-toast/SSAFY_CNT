import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./../../../assets/logo.svg";
import pdf from "./../../../assets/pdf.svg";
import excel from "./../../../assets/excel.svg";
import NationOrItem from "../../molecules/navBar/NationOrItem";
import NationSelector from "../../molecules/navBar/NationSelector";
import ViewPeriod from "../../molecules/navBar/ViewPeriod";
import Pdf from "../../molecules/navBar/Pdf";
import unImg from "./../../../../assets/nationalFlags/UN.png";
import Code from "../../../assets/Code.json";
import Excel from "../../molecules/navBar/Excel";
import axios from "axios";
import Login from "../../pages/Login";

function NavBar(props) {
  const navigate = useNavigate();
  // Nation, Item의 state에서 Default를 Nation으로 설정
  const [state, setState] = useState("Nation");

  // stateHandler라는 함수를 사용하여 state를 이용
  const stateHandler = (event) => {
    setState(event);
  };

  const params = useParams();
  const src =
    "./../../../../assets/nationalFlags/" + params.nationCode + ".gif";
  const onErrorImg = (e) => {
    e.target.src = unImg;
  };

  const nationNameList = [];
  for (let i = 3; i < Code.국가코드.length; i++) {
    if (Code.국가코드[i].Column1 === params.nationCode) {
      nationNameList.push(Code.국가코드[i].Column2);
    }
  }
  // console.log(nationNameList)

  return (
    <>
      <nav className="flex justify-between  sticky top-0 bg-slate-200 content-center font-mun">
        {/* <img src={logo} className="w-20 h-20 ml-5 mt-2" /> */}
        <button
          onClick={() => {
            navigate("/nation/ALL/202203-202302");
          }}
        >
          <img src={logo} className="w-32 h-32 ml-10" />
        </button>

        <div className="content-center flex items-center">
          <NationOrItem stateHandler={stateHandler} />
        </div>

        {/* {state === "Nation" ? ( */}
        <div className="content-center flex items-center">
          <NationSelector />
          <div className="flex flex-inline text-2xl ml-5">
            <img src={src} onError={onErrorImg} className="w-11 h-8 mr-3" />
            {nationNameList}
          </div>
        </div>

        {/* // ) : null} */}
        {/* // {state === "Item" ? <ItemSelector /> : null} */}

        <div className="flex flex-inline items-center text-2xl ml-5">
          <ViewPeriod />
        </div>

        <div className="flex justify-between items-center align-middle mr-10">
          <Pdf />
          <Excel apiData={props.apiData} />
        </div>

        <div>
          <button onClick={() => {
          navigate("/login")
        }}>Login </button> </div>
      </nav>
    </>
  );
}

export default NavBar;
