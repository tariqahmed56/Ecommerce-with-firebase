import React from "react";

const Button = ({ onClick, text , isSubmitting}) => {
  return (
    <button
    disabled={isSubmitting !== undefined ? isSubmitting : false}
    className={`bg-black text-white px-4 py-2 max-w-[300px] min-w-[80px] w-[250px]  rounded-md hover:border-black border-2
     hover:bg-white hover:text-black ${isSubmitting ? "cursor-not-allowed text-2xl tracking-widest": " " } `} onClick={onClick}>
     {isSubmitting ? "..." : text}
    </button>
  );
};

export default Button;
