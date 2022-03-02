import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <div className="spinner" style={{display: "flex", justifyContent: "center"}}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
