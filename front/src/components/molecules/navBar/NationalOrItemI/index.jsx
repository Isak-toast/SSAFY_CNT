import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function NationOrItemI(props) {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      {/* <div className="flex justify-between font-mun"> */}
      <div className="font-mun align-middle">
        <input
          id="nation"
          className="peer/nation"
          type="radio"
          name="status"
          onClick={() => {
            props.stateHandler("Nation");
            navigate("/nation/ALL/" + params.duration);
          }}
        />
        <label
          htmlFor="nation"
          className="peer-checked/nation:text-sky-500 ml-2 text-2xl font-bold"
        >
          국가별
        </label>
      </div>

      <div className="font-mun ml-10">
        <input
          id="item"
          className="peer/item"
          type="radio"
          name="status"
          defaultChecked
          onClick={() => {
            props.stateHandler("Item");
          }}
        />
        <label
          htmlFor="item"
          className="peer-checked/item:text-sky-500 ml-2 text-2xl font-bold"
        >
          품목별
        </label>
      </div>
    </>
  );
}
export default NationOrItemI;
