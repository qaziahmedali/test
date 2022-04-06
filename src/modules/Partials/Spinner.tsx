import React from "react";
import {Oval} from "react-loader-spinner";
const Spinner = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          overflow: "show",
          margin: "auto",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "50px",
          height: "50px",
        }}
      >
        <Oval color="#00BFFF" height={80} width={80} />
        {/* <Loader
          type="Oval"
          color=" #282C35"
          height={50}
          width={50}
          timeout={3000} //3 secs
        /> */}
      </div>
    </>
  );
};

export default Spinner;
