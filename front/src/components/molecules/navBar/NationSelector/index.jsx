import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Code from "../../../../assets/Code.json";
import unImg from "./../../../../../assets/nationalFlags/UN.png";
import Modal from "react-modal";
import magnifier1 from "../../../../assets/magnifier1.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "50%",
    width: "30%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const nationOptions = [];
for (let i = 3; i < Code.국가코드.length; i++) {
  let imgSrc =
    "./../../../../../assets/nationalFlags/" +
    Code.국가코드[i].Column1 +
    ".gif";
  const onErrorImg = (e) => {
    e.target.src = unImg;
  };

  nationOptions.push({
    value: Code.국가코드[i].Column1 + " / " + Code.국가코드[i].Column2,
    label: (
      <div className="flex flex-inline ">
        <div className="w-10 h-10">
          <img src={imgSrc} onError={onErrorImg} alt="" />
        </div>
        <div className="ml-3">{Code.국가코드[i].Column2}</div>
      </div>
    ),
    // label: Code.국가코드[i].Column2,
    // 다음과 같이 표현가능
    // value: Code.국가코드[i]["Column1"]
  });
}

function NationSelector() {
  const params = useParams();
  const [nationSelect, setNationSelect] = useState(params.nationCode);
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

  const nationSelectHandler = (event) => {
    setNationSelect(event.value);
  };

  const nationState = {
    nationCode: nationSelect.split(" / ")[0],
    nationName: nationSelect.split(" / ")[1],
  };

  // useEffect(() => {
  //   navigate("/nation/" + nationState.nationCode + "/" + params.duration);
  // }, [nationSelect]);

  const styles = {
    control: base => ({
      ...base,
      fontFamily: "munchebu"
    }),
    menu: base => ({
      ...base,
      fontFamily: "munchebu"
    })
  };

  return (
    <div className="font-mun">
      <button onClick={openModal} className="text-2xl inline-flex">
        국가
        <img src={magnifier1} className="w-8 h-8 ml-2" />
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={IsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Select
          options={nationOptions}
          placeholder="국가를 검색해주세요."
          // defaultInputValue="국가를 검색해주세요."
          onChange={nationSelectHandler}
          styles={styles}
        />

        <div className="mt-5 left-20px font-mun">
          <button
            onClick={() => {
              closeModal();
              navigate(
                "/nation/" + nationState.nationCode + "/" + params.duration
              );
            }}
            className="rounded hover:rounded-lg bg-blue-300 mr-3 p-1"
          >
            확인
          </button>

          <button
            onClick={closeModal}
            className="rounded hover:rounded-lg bg-red-300 mr-3 p-1"
          >
            취소
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NationSelector;
