import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import "../stylesheets/Home.css";

const SubNav = () => {
  const location = useLocation();

  var path = location.pathname;

  path = path.replace("/browse", "");

  return (
    <div className="sub-nav">
      <NavLink
        to={path}
        activeStyle={{ color: "#FFA825" }}
        className="sub-nav-link"
      >
        Discover
      </NavLink>
      <NavLink
        to={path + "/browse"}
        activeStyle={{ color: "#FFA825" }}
        className="sub-nav-link"
      >
        Browse
      </NavLink>
      {/* <NavLink to="/suggested" className="sub-nav-link">
        Suggested
      </NavLink> */}
      <div
        className="sub-nav-link"
        style={{ display: "flex", flexGrow: 1, flexDirection: "row-reverse" }}
      >
        <SearchBar />
      </div>
    </div>
  );
};

export default SubNav;
