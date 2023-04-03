import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import Item from "./components/pages/Item";
import Nation from "./components/pages/Nation";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Err404 from "./components/pages/ERR404";

function App() {
  // const [nationOrItem, setNationOrItem] = useState("nation");

  // const setNationOrItemHandler = (e) => {
  //   setNationOrItem(e);
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/nation/ALL/202203-202302" />} />
        <Route path="/nation/:nationCode/:duration" element={<Nation />} />
        <Route path="/item/:hsCode/:duration" element={<Item />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/err404" element={<Err404 />} />
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
