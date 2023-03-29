import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function NationOrItem(props) {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      <div className="font-mun align-middle">
        <input
          id="nation"
          className="peer/nation"
          type="radio"
          name="status"
          defaultChecked
          onClick={() => {
            props.stateHandler("Nation");
          }}
        />
        <label htmlFor="nation" className="peer-checked/nation:text-sky-500 ml-2 text-2xl font-bold">
          국가
        </label>
      </div>

      <div className="font-mun ml-10">
        <input
          id="item"
          className="peer/item"
          type="radio"
          name="status"
          onClick={() => {
            props.stateHandler("Item");
            navigate("/item/all/" + params.duration);
          }}
        />
        <label htmlFor="item" className="peer-checked/item:text-sky-500 ml-2 text-2xl font-bold">
          품목
        </label>
      </div>
    </>
  );
}
export default NationOrItem;
