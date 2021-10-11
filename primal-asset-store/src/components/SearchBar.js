import { useState } from "react";
import { BiSearch } from "react-icons/bi";
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
        <BiSearch size="1.5em" color="white" />
      </button>
    </div>
  );
};
export default SearchBar;
