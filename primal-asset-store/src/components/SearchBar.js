import { useState } from "react";
import searchicon from "./static/Search.svg";
import "./stylesheets/Home.css";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <input
        className="search-bar"
        key="search-input"
        value={keyword}
        placeholder={"search"}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="search-icon">
        <img width="20vw" src={searchicon} />
      </button>
    </div>
  );
};
export default SearchBar;
