import React, { useState } from "react";

function NationOrItem() {
  const [checked, setChecked] = useState(true);

  const isChecked = () => {
    setChecked(true);
  };

  return (
    <>
      <fieldset>
        <div className="flex justify-between">
          <input
            id="nation"
            className="peer/nation"
            type="radio"
            name="status"
            defaultChecked
            onClick={isChecked}
          />
          <label htmlFor="nation" className="peer-checked/nation:text-sky-500">
            국가
          </label>

          <input id="item" className="peer/item" type="radio" name="status" />
          <label htmlFor="item" className="peer-checked/item:text-sky-500">
            품목
          </label>
        </div>
      </fieldset>
    </>
  );
}
export default NationOrItem;
