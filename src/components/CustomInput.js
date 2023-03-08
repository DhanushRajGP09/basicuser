import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none border-2 border-blue-900 z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 bg-white mt-2 w-full  "
        )}
        style={{ width: "100%" }}
        onPaste={(e) => {
          e.preventDefault();
        }}
      ></textarea>
    </>
  );
};

export default CustomInput;
