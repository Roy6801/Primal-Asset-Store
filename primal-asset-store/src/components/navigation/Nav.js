import { NavLink } from "react-router-dom";
import Login from "../Login";
import "../stylesheets/Home.css";
import primal from "../static/Primal.svg";
import cart from "../static/Cart.svg";

const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/" activeStyle className="nav-link">
        <img src={primal} style={{ width: "18vw" }} />
      </NavLink>
      <NavLink to="/ui" activeStyle className="nav-link">
        UI
      </NavLink>
      <NavLink to="/game" activeStyle className="nav-link">
        Game
      </NavLink>
      <NavLink to="/about" activeStyle className="nav-link">
        About
      </NavLink>
      <NavLink to="/faq" activeStyle className="nav-link">
        FAQ
      </NavLink>
      <div
        className="nav-link"
        style={{ flexGrow: 1, flexDirection: "row-reverse" }}
      >
        <div className="profile-menu">
          <Login />
        </div>
        <img src={cart} className="cart" />
      </div>
    </div>
  );
};

export default Nav;
