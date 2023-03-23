import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../organism/NavBar";
import DataFirst from "../../organism/DataFirst";
import DataSecond from "../../organism/DataSecond";
import DataThird from "../../organism/DataThird/index";
import WorldMap from "../../organism/WorldMap";

function Nation() {
  const params = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/nation/" +
          params.nationName +
          "/" +
          params.duration
      )
      .then((response) => setData(response.data));
  }, [params]);

  return (
    <>
      <NavBar />
      <WorldMap data1={data} />
      <DataFirst data1={data} />
      <DataSecond />
      <DataThird />
    </>
  );
}

export default Nation;
