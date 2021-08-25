import React from "react";

const SearchBar = ({ keyword, setKeyword }) => {
  const BarStyling = {
    width: "30vw",
    height: "6vh",
    background: "#FFFFFF",
    borderRadius: "30px",
  };
  return (
    <input
      style={BarStyling}
      key="random1"
      value={keyword}
      placeholder={"search "}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};
export default SearchBar;
