import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import "../stylesheets/Home.css";

const SubNav = () => {
  const location = useLocation();

  var path = location.pathname;

  path = path.replace("/browse", "");

  var temp = path.split("/");

  const typeId = temp[temp.length - 1];

  return (
    <div className="sub-nav">
      <NavLink
        exact
        to={path}
        activeStyle={{ color: "#FFA825" }}
        className="sub-nav-link"
      >
        Discover
      </NavLink>
      <NavLink
        exact
        to={path + "/browse"}
        activeStyle={{ color: "#FFA825" }}
        className="sub-nav-link"
      >
        Browse
      </NavLink>
      <div
        className="sub-nav-link"
        style={{ display: "flex", flexGrow: 1, flexDirection: "row-reverse" }}
      >
        <SearchBar typeId={typeId} />
      </div>
    </div>
  );
};

export default SubNav;
