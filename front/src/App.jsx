import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import Item from "./components/pages/Item";
import Nation from "./components/pages/Nation";

function App() {
  // const [nationOrItem, setNationOrItem] = useState("nation");

  // const setNationOrItemHandler = (e) => {
  //   setNationOrItem(e);
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/nation/all/202203-202302" />} />
        <Route path="/nation/:nationCode/:duration" element={<Nation />} />
        <Route path="/item/:hsCode/:duration" element={<Item />} />
      </Routes>

      {/* {nationOrItem === "nation" ? (
        <>
          <Nation setNationOrItemHandler={setNationOrItemHandler} />
        </>
      ) : (
        <Item setNationOrItemHandler={setNationOrItemHandler} />
      )} */}
    </>
  );
}

export default App;
