import React from "react";
import loading from "../img/loading.gif";

const Spinnerloader = () => {
  return (
    <>
      <div className="text-center">
        <img src={loading} alt="" />
      </div>
    </>
  );
};

export default Spinnerloader;
