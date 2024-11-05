import React from "react";

const Button = ({ onClickhandler, text }) => {
  return (
    <button className="bg-black text-white px-4 py-2 w-full rounded-md hover:border-black border-2
     hover:bg-white hover:text-black" onClick={onClickhandler}>
     {text}
    </button>
  );
};

export default Button;
