import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Modal from "react-modal";
import Code from "../../../../assets/Code.json";
import SixCode from "../../../../assets/SixCode.json";
import magnifier1 from "../../../../assets/magnifier1.png";
import { useRecoilState } from "recoil";
import { pdfStateAtom } from "../../../../states/recoilPdfState";
import { excelDisabled } from "../../../../states/Excel";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "60%",
    width: "30%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "munchebu",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "munchebu",
  }),
};

function ItemSelector() {
  const [pdfState, setPdfState] = useRecoilState(pdfStateAtom);
  const params = useParams();
  const [disable, setDisable] = useRecoilState(excelDisabled);

  // hsCode 정제
  const sixDigitCode = [];
  for (let i = 4; i < SixCode.length; i++) {
    sixDigitCode.push(SixCode[i].hsCode.toString());
  }

  // hsCode 10자리
  // vlaue에 codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5과
  // const itemOptions = [];
  // for (let i = 4; i < Code.성질통합분류코드.length; i++) {
  //   let codeColumn2 = Code.성질통합분류코드[i].Column2.toString().substring(
  //     0,
  //     6
  //   );
  //   let codeColumn4 = Code.성질통합분류코드[i].Column4;
  //   let codeColumn5 = Code.성질통합분류코드[i].Column5;
  //   // console.log(codeColumn2);
  //   if (codeColumn4.length >= 20 && codeColumn5.length >= 20) {
  //     itemOptions.push({
  //       value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
  //       label:
  //         codeColumn2 +
  //         " / " +
  //         codeColumn4.substr(0, 19) +
  //         " ..." +
  //         " / " +
  //         codeColumn5.substr(0, 19) +
  //         " ...",
  //     });
  //   } else if (codeColumn4.length >= 20 && codeColumn5.length < 20) {
  //     itemOptions.push({
  //       value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
  //       label:
  //         codeColumn2 +
  //         " / " +
  //         codeColumn4.substr(0, 19) +
  //         " ..." +
  //         " / " +
  //         codeColumn5,
  //     });
  //   } else if (codeColumn4.length < 20 && codeColumn5.length >= 20) {
  //     itemOptions.push({
  //       value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
  //       label:
  //         codeColumn2 +
  //         " / " +
  //         codeColumn4 +
  //         " / " +
  //         codeColumn5.substr(0, 19) +
  //         " ...",
  //     });
  //   } else {
  //     itemOptions.push({
  //       value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
  //       label: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
  //     });
  //   }
  // }

  // for (let i = 4; i < Code.성질통합분류코드.length; i++) {
  //   console.log(Code.성질통합분류코드[i].Column2.toString().substring(0, 6));
  // }
  // console.log(Code.성질통합분류코드[3].Column2);
  // hsCode 6자리
  const itemOptions = [];
  for (let j = 0; j < sixDigitCode.length; j++) {
    for (let i = 4; i < Code.성질통합분류코드.length; i++) {
      let codeColumn2 = Code.성질통합분류코드[i].Column2.toString().substring(
        0,
        6
      );

      let codeColumn4 = Code.성질통합분류코드[i].Column4;
      if (
        sixDigitCode[j] === codeColumn2 &&
        Code.성질통합분류코드[i - 1].Column2.toString().substring(0, 6) !=
          Code.성질통합분류코드[i].Column2.toString().substring(0, 6)
      ) {
        if (codeColumn4.length >= 20) {
          itemOptions.push({
            value: codeColumn2 + " / " + codeColumn4,
            label: codeColumn2 + " / " + codeColumn4.substr(0, 19) + " ...",
          });
        } else {
          itemOptions.push({
            value: codeColumn2 + " / " + codeColumn4,
            label: codeColumn2 + " / " + codeColumn4,
          });
        }
      }
    }
  }

  // react-select/async 사용
  const filterNations = (inputValue) => {
    return itemOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Promise 사용
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterNations(inputValue));
      }, 1000);
    });

  const navigate = useNavigate();

  const [IsOpen, setIsOpen] = useState(false);

  // Modal을 Open하는 함수
  const openModal = () => {
    setIsOpen(true);
  };

  // Modal을 Close하는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  const itemSelect = [];
  for (let i = 0; i < itemOptions.length; i++) {
    if (params.hsCode === itemOptions[i].value.split(" / ")[0]) {
      itemSelect.push({
        value: itemOptions[i].value,
      });
    }
  }

  const [codeCoulmn, setCodeColumn] = useState(itemSelect[0].value);
  const codeColumnHandler = (event) => {
    setCodeColumn(event.value);
  };

  const allCodeColumn = {
    hsCode: codeCoulmn.split(" / ")[0],
    fourDigit: codeCoulmn.split(" / ")[1],
    // tenDigit: codeCoulmn.split(" / ")[2], // hsCode 10자리
  };

  return (
    <div className="font-mun">
      <button onClick={openModal} className="text-2xl inline-flex hover:scale-125">
        품목
        <img src={magnifier1} className="w-8 h-8 ml-2 mr-5" />
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={IsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AsyncSelect
          cacheOptions
          defaultOptions={false}
          loadOptions={promiseOptions}
          filterOption={null}
          placeholder="품목명이나 HS CODE를 입력하세요."
          onChange={codeColumnHandler}
          styles={styles}
        />
        <div className="font-mun">
          <div className="rounded hover:rounded-lg bg-stone-200 mr-3 pl-4 pr-4 pt-1 pb-1 w-full text-center mt-3">
            <a href="https://www.hs-tariff.com/" target="_blank">
              HS CODE 상세검색
            </a>
          </div>
          <br />
          <h2 className="font-semibold">HS CODE</h2>
          <div>{allCodeColumn.hsCode}</div>
          <br />
          <h2 className="font-semibold">세번 6단위품명</h2>
          <div>{allCodeColumn.fourDigit}</div>
          {/* <br />
          <h2 className="font-semibold">세번 10단위품명</h2>
          <div>{allCodeColumn.tenDigit}</div> */}
          <div className="mt-5 left-20px flex justify-center">
            <button
              onClick={() => {
                closeModal();
                setPdfState(false);
                setDisable(true);
                navigate(
                  "/item/" + codeCoulmn.slice(0, 6) + "/" + params.duration
                );
              }}
              className="rounded hover:rounded-lg bg-blue-300 mr-3 pl-4 pr-4 pt-1 pb-1"
            >
              확인
            </button>
            <button
              onClick={closeModal}
              className="rounded hover:rounded-lg bg-red-300 mr-3 pl-4 pr-4 pt-1 pb-1"
            >
              취소
            </button>
          </div>
        </div>
      </Modal>
      <div></div>
    </div>
  );
}

export default ItemSelector;
