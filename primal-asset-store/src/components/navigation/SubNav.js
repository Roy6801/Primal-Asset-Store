import SearchBar from "../SearchBar";
import "../stylesheets/Home.css";
import searchicon from "../static/Search.svg";

const SubNav = () => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-link">Discover</div>
      <div className="sub-nav-link">Browse</div>
      <div className="sub-nav-link">Suggested</div>
      <div
        className="sub-nav-link"
        style={{ display: "flex", flexGrow: 1, flexDirection: "row-reverse" }}
      >
        <img src={searchicon} className="search-icon" />
        <SearchBar />
      </div>
    </div>
  );
};

export default SubNav;
