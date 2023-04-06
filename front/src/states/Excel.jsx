import { atom } from "recoil";

//여러 컴포넌트에서 비동기로 데이터를 수신하면서 받게 되는 데이터를 recoil로 관리함

// 국가 페이지의 데이터 1행에 대한 상태
const excelState1 = atom({
  key: "excelState1",
  default: "",
});

//국가 페이지의 데이터 2행에 대한 상태
const excelState2 = atom({
  key: "excelState2",
  default: "",
});

//국가 페이지의 데이터 3행에 대한 상태
const excelState3 = atom({
  key: "excelState3",
  default: "",
});

//품목 페이지의 데이터 1행에 대한 상태
const excelStateI1 = atom({
  key: "excelStateI1",
  default: "",
});

//품목 페이지의 데이터 2행에 대한 상태
const excelStateI2 = atom({
  key: "excelStateI2",
  default: "",
});

//품목 페이지의 데이터 3행에 대한 상태
const excelStateI3 = atom({
  key: "excelStateI3",
  default: "",
});

//엑셀 아이콘 disable 상태 관리
const excelDisabled = atom({
  key: "excelDisabled",
  default: true,
});

export {
  excelState1,
  excelState2,
  excelState3,
  excelStateI1,
  excelStateI2,
  excelStateI3,
  excelDisabled,
};
