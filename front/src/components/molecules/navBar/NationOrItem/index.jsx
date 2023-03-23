import React from "react";

function NationOrItem(props) {
  return (
    <>
      <div className="flex justify-between">
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
        <label htmlFor="nation" className="peer-checked/nation:text-sky-500">
          국가
        </label>
      </div>

      <div>
        <input
          id="item"
          className="peer/item"
          type="radio"
          name="status"
          onClick={() => {
            props.stateHandler("Item");
          }}
        />
        <label htmlFor="item" className="peer-checked/item:text-sky-500">
          품목
        </label>
      </div>
    </>
  );
}
export default NationOrItem;
