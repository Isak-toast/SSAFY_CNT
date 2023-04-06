import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import magnifier1 from "../../../../assets/magnifier1.png";

// 오늘 날짜
const today = new Date();
// // 오늘 기준 년
const todayYear = today.getFullYear();
// // 오늘 기준 일
const todayMonth = today.getMonth();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "40%",
    width: "25%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const yearList = [];
for (let i = todayYear; i >= todayYear - 10; i = i - 1) {
  {
    yearList.push({ value: i, label: i });
  }
}

const todayYearMonthList = [];
for (let i = 1; i <= todayMonth; i = i + 1) {
  {
    todayYearMonthList.push({ value: i, label: i });
  }
}

const monthList = [];
for (let i = 1; i <= 12; i = i + 1) {
  {
    monthList.push({ value: i, label: i });
  }
}

// 함수 시작
function ViewPeriod() {
  const params = useParams();
  const navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(false);

  // Modal을 Open하는 함수
  const openModal = () => {
    setIsOpen(true);
    setSearch(false);
  };

  // Modal을 Close하는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  // 시작 연도 선택 함수
  const [startYear, setStartYear] = useState();
  const startYearHandler = (event) => {
    setStartYear(event.value);
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
  const searchStartNum = startYM.startY * 100 + startYM.startM;

  // 종료 연도 선택 함수
  const [endYear, setEndYear] = useState();
  const endYearHandler = (event) => {
    setEndYear(event.value);
  };

  // 종료 월 선택 함수
  const [endMonth, setEndMonth] = useState();
  const endMonthHandler = (event) => {
    setEndMonth(event.value);
    setSearch(true);
  };

  // 조회 종료 기간
  const endYM = {
    endY: endYear,
    endM: endMonth,
  };

  // 조회 기간 표현
  const searchEnd = endYM.endY + "." + endYM.endM;
  const searchEndNum = endYM.endY * 100 + endYM.endM;

  // 종료 연도 리스트(시작년도 이후로 부터)
  const endYearList = [];
  for (let i = todayYear; i >= startYM.startY; i--) {
    endYearList.push({ value: i, label: i });
  }

  // 종료 월 리스트
  const endMonthList = [];
  // 시작 연도와 올해가 동일하면,
  if (startYM.startY === todayYear) {
    for (let i = startYM.startM; i <= todayMonth; i++) {
      endMonthList.push({ value: i, label: i });
    }
  } else if (startYM.startY < todayYear && startYM.startY === endYM.endY) {
    for (let i = startYM.startM; i <= 12; i++) {
      endMonthList.push({ value: i, label: i });
    }
  } else if (startYM.startY < todayYear && endYM.endY === todayYear) {
    for (let i = 1; i <= todayMonth; i++) {
      endMonthList.push({ value: i, label: i });
    }
  } else if (startYM.startY < todayYear && startYM.startY < endYM.endY) {
    for (let i = 1; i <= 12; i++) {
      endMonthList.push({ value: i, label: i });
    }
  }

  const [duration, setDuratinon] = useState("");

  const setDurationHandler = () => {
    setDuratinon(
      (startYear * 100 + startMonth).toString() +
        "-" +
        (endYear * 100 + endMonth).toString()
    );
  };

  // 최종제출시 에러 검토 후 duration 변경
  const durationHandler = () => {
    if (searchStartNum > searchEndNum) {
      alert("조회시작기간이 조회종료기간보다 빠릅니다.");
    } else {
      setDurationHandler();
    }
  };

  useEffect(() => {
    navigate("/nation/" + params.nationCode + "/" + duration);
  }, [duration]);

  return (
    <div className="font-mun">
      <button onClick={openModal} className="mr-5 inline-flex hover:scale-125">
        기간
        <img src={magnifier1} className="w-8 h-8 ml-2" />
      </button>
      {params.duration.substring(0, 4) +
        "." +
        params.duration.substring(4, 6) +
        " ~ " +
        params.duration.substring(7, 11) +
        "." +
        params.duration.substring(11, 13)}
      <Modal
        ariaHideApp={false}
        isOpen={IsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="font-mun flex justify-around items-center">
          <h2 className="text-lg">시작 연월</h2>
          <Select
            options={yearList}
            onChange={startYearHandler}
            placeholder="연"
          />
          {startYM.startY === todayYear ? (
            <Select
              options={todayYearMonthList}
              onChange={startMonthHandler}
              placeholder="월"
            />
          ) : (
            <Select
              options={monthList}
              onChange={startMonthHandler}
              placeholder="월"
            />
          )}
        </div>

        <br />

        <div className="font-mun flex justify-around items-center">
          <h3 className="text-lg">종료 연월</h3>
          <Select
            options={endYearList}
            onChange={endYearHandler}
            placeholder="연"
          />
          {endYM.endY === todayYear ? (
            <Select
              options={endMonthList}
              onChange={endMonthHandler}
              placeholder="월"
            />
          ) : (
            <Select
              options={endMonthList}
              onChange={endMonthHandler}
              placeholder="월"
            />
          )}
        </div>

        <br />
        <form className="font-mun flex justify-center text-lg ">
          {search === true ? (
            <button
              className="rounded hover:rounded-lg bg-blue-300 mr-3 pl-4 pr-4 pt-1 pb-1"
              onClick={durationHandler}
            >
              조회
            </button>
          ) : (
            <div className="rounded  bg-gray-300 mr-3 pl-4 pr-4 pt-1 pb-1">
              조회
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}

export default ViewPeriod;
