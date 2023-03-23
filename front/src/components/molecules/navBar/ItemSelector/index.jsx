import React, { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";

const DUMMY_ITEM = [
  { hsCd: "1001999090", statKor: "기타" },
  { hsCd: "0101191000", statKor: "경 주 말" },
  { hsCd: "0103100000", statKor: "번식용" },
];

for (let i = 0; i < DUMMY_ITEM.length; i++) {
  DUMMY_ITEM[i].label = DUMMY_ITEM[i].hsCd + "/" + DUMMY_ITEM[i].statKor;
  DUMMY_ITEM[i].value = DUMMY_ITEM[i].hsCd + "/" + DUMMY_ITEM[i].statKor;
}

console.log(DUMMY_ITEM);

// const DUMMY_ITEM = [];
// for (let i = 1; i <= 1000000000; i++) {
//   DUMMY_ITEM.push({ hscode: i });
// }
// console.log(DUMMY_ITEM);

function ItemSelector() {
  const [IsOpen, setIsOpen] = useState(false);

  // Modal을 Open하는 함수
  const openModal = () => {
    setIsOpen(true);
  };

  // Modal을 Close하는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* <button onClick={openModal}>품목 조회</button>
      <Modal
        ariaHideApp={false}
        isOpen={IsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button> */}
      <Select
        placeholder="HSCODE 10자리 또는 품목명을 입력해주세요."
        options={DUMMY_ITEM}
      />
      {/* <br />
        <hr />
        <br />
        <h2>전체</h2>
      </Modal> */}
    </div>
  );
}

export default ItemSelector;
