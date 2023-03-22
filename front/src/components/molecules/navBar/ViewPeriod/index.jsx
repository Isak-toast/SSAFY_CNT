import React, { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// 오늘 날짜
const today = new Date();
// // 오늘 기준 년
const todayYear = today.getFullYear();
// // 오늘 기준 일
const todayMonth = today.getMonth();

// 오늘 년도 기준 10년전
// const yearList = [
//   { value: 2023, label: 2023 },
//   { value: 2022, label: 2022 },
//   { value: 2021, label: 2021 },
//   { value: 2020, label: 2020 },
//   { value: 2019, label: 2019 },
// ];
const yearList = [];
for (let i = todayYear; i >= todayYear - 10; i = i - 1) {
  {
    yearList.push({ value: i, label: i });
  }
}
// console.log(yearList[0].value);

// 올해 년도 기준, 월 표시
// const todayYearMonthList = [
//   { value: 1, label: 1 },
//   { value: 2, label: 2 },
//   { value: 3, label: 3 },
// ];
const todayYearMonthList = [];
for (let i = 1; i <= todayMonth; i = i + 1) {
  {
    todayYearMonthList.push({ value: i, label: i });
  }
}
// console.log(todayYearMonthList);

// 1월 ~ 12월
// const monthList = [
//   { value: 1, label: 1 },
//   { value: 2, label: 2 },
//   { value: 3, label: 3 },
//   { value: 4, label: 4 },
//   { value: 5, label: 5 },
//   { value: 6, label: 6 },
//   { value: 7, label: 7 },
//   { value: 8, label: 8 },
//   { value: 9, label: 9 },
//   { value: 10, label: 10 },
//   { value: 11, label: 11 },
//   { value: 12, label: 12 },
// ];
const monthList = [];
for (let i = 1; i <= 12; i = i + 1) {
  {
    monthList.push({ value: i, label: i });
  }
}
// console.log(monthList);

// 함수 시작
function ViewPeriod() {
  const [IsOpen, setIsOpen] = React.useState(false);

  // Modal을 Open하는 함수
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  // Modal을 Close하는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  // 시작 연도 선택 함수
  const [startYear, setStartYear] = useState();
  const startYearHandler = (event) => {
    setStartYear(event.value);
    // console.log(event.value);
  };

  // 시작 월 선택 함수
  const [startMonth, setStartMonth] = useState();
  const startMonthHandler = (event) => {
    setStartMonth(event.value);
  };

  // 조회 시작 기간
  const startYM = {
    startY: startYear,
    startM: startMonth,
  };

  const searchStart = startYM.startY + "." + startYM.startM;
  console;

  // 종료 연도 선택 함수
  const [endYear, setEndYear] = useState();
  const endYearHandler = (event) => {
    setEndYear(event.value);
  };

  // 종료 월 선택 함수
  const [endMonth, setEndMonth] = useState();
  const endMonthHandler = (event) => {
    setEndMonth(event.value);
  };

  // 조회 종료 기간
  const endYM = {
    endY: endYear,
    endM: endMonth,
  };

  const searchEnd = endYM.endY + "." + endYM.endM;

  console.log(endYM);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={IsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <div>
          <h2>시작 년/월</h2>
          <br />
          <h3>시작 년도</h3>
          <Select options={yearList} onChange={startYearHandler} />
          {/* <Select options={yearList} /> */}
          <h3>시작 월</h3>
          {startYM.startY === todayYear ? (
            <Select options={todayYearMonthList} onChange={startMonthHandler} />
          ) : (
            <Select options={monthList} onChange={startMonthHandler} />
          )}
        </div>
        <br />
        <hr />
        <br />
        <div>
          <h2>종료 년/월</h2>
          <br />
          <h3>종료 년도</h3>
          <Select options={yearList} onChange={endYearHandler} />
          {/* <Select options={yearList} /> */}
          <h3>종료 월</h3>
          {endYM.endY === todayYear ? (
            <Select options={todayYearMonthList} onChange={endMonthHandler} />
          ) : (
            <Select options={monthList} onChange={endMonthHandler} />
          )}
        </div>

        <br />
        <hr />
        <br />

        <div>
          <h2>
            조회기간 : {searchStart} ~ {searchEnd}
          </h2>
        </div>

        <form>
          <input />
          <button>적용하기</button>
        </form>
      </Modal>
    </div>
  );
}

export default ViewPeriod;
