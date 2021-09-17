import "../stylesheets/Home.css";
import { useState } from "react";
import service from "../functions/service";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileMenu = ({ googleId, setToken }) => {
  const [user, setUser] = useState();

  if (!user) {
    service
      .verify(googleId)
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return null;
  } else {
    if (user.userName) {
      return (
        <div className="profile-menu-display">
          <div className="profile-menu-display-section1">
            <label>{`User - ${user.userName}`}</label>
            <label>{`${user.firstName} ${user.lastName}`}</label>
            <label>{`Coins - ${user.coins}`}</label>
            <label>{`Downloads - ${user.assetsDownloaded}`}</label>
            <label>{`Purchases - ${user.assetsPurchased}`}</label>
            <label>{`Projects - ${user.coins}`}</label>
            <label>{`Favorites - ${user.coins}`}</label>
          </div>
          <div style={{ display: "flex" }}>
            <NavLink to="/user/profile" activeStyle={{ color: "#FFA825" }}>
              View Profile
            </NavLink>
            <NavLink to="/user/account" activeStyle={{ color: "#FFA825" }}>
              View Account
            </NavLink>
          </div>
          <button
            onClick={(e) => {
              setToken();
              window.localStorage.removeItem("primal-UIG-asset-store-G10");
            }}
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="profile-menu-display">
          <div className="profile-menu-display-section1">
            <label>Set Profile Username!</label>
          </div>
          <div style={{ display: "flex" }}>
            <NavLink to="/user/profile" activeStyle={{ color: "#FFA825" }}>
              View Profile
            </NavLink>
            <NavLink to="/user/account" activeStyle={{ color: "#FFA825" }}>
              View Account
            </NavLink>
          </div>
          <button
            onClick={(e) => {
              setToken();
              window.localStorage.removeItem("primal-UIG-asset-store-G10");
            }}
          >
            Log Out
          </button>
        </div>
      );
    }
  }
};

ProfileMenu.propTypes = {
  googleId: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default ProfileMenu;
