import React from "react";

const Title = ({ genre, intro, textColor }) => {
  return (
    <div
      className={`flex flex-col ${
        textColor ? textColor : "text-black"
      } font-bold`}
    >
      <h1 className="text-center text-[3.8rem]">
        <span className="block">
          <span style={{ fontFamily: "Playfair Display" }} className="italic">
            {genre}
          </span>{" "}
          <span>Fashion</span>
        </span>
      </h1>
      <p className="text-center text-xl font-light px-2">{intro}</p>
    </div>
  );
};

export default Title;
