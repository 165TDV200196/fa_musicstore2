import React, { useState } from "react";
import "./style.scss";
export default function InputField({ changeQ }) {
  const [value, setValue] = useState();
  const hangleInuput = (e) => {
    if (e.keyCode === 13) {
      changeQ(e.target.value);
    }
  };
  const hangleBtn = (e) => {
    changeQ(value);
  };
  return (
    <div className="inputSearch">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name=""
          id=""
          aria-describedby="helpId"
          placeholder=""
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={hangleInuput}
        />
        <button type="button" class="btn btn-primary" onClick={hangleBtn}>
          Search
        </button>
      </div>
    </div>
  );
}
