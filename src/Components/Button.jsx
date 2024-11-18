import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button className="bg-black text-white px-4 py-2 w-[300px] rounded-md hover:border-black border-2
     hover:bg-white hover:text-black" onClick={onClick}>
     {text}
    </button>
  );
};

export default Button;
