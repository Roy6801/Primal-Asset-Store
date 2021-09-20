import { useState } from "react";
import service from "../functions/service";
import { NavLink } from "react-router-dom";
import "../stylesheets/Home.css";
import "../stylesheets/ProfileMenu.css";

const ProfileMenu = ({ setToken }) => {
  const [user, setUser] = useState();

  const googleId = JSON.parse(
    window.localStorage.getItem("primal-UIG-asset-store-G10")
  ).googleId;

  if (!googleId) {
    setToken();
    window.localStorage.removeItem("primal-UIG-asset-store-G10");
  }

  if (!user) {
    service
      .verify(googleId)
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        setToken();
        window.localStorage.removeItem("primal-UIG-asset-store-G10");
      });

    return null;
  } else {
    if (user.userName) {
      return (
        <div>
          <div className="profile-menu-display">
            <div className="profile-menu-display-section1 detail-tag">
              <label>User</label>
              <label>Name</label>
              <label>Coins</label>
              <label>Downloads</label>
              <label>Purchases</label>
              <label>Projects</label>
              <label>Favorites</label>
            </div>
            <div className="profile-menu-display-section1 ">
              <label>-</label>
              <label>-</label>
              <label>-</label>
              <label>-</label>
              <label>-</label>
              <label>-</label>
              <label>-</label>
            </div>
            <div className="profile-menu-display-section1 detail-info">
              <label>{user.userName}</label>
              <label>{user.firstName + " " + user.lastName}</label>
              <label>{user.coins}</label>
              <label>{user.assetsDownloaded}</label>
              <label>{user.assetsPurchased}</label>
              <label>{user.coins}</label>
              <label>{user.coins}</label>
            </div>
          </div>
          <div className="container">
            <NavLink
              to="/user/profile"
              className="link-style"
              activeStyle={{ color: "#FFA825" }}
            >
              View Profile
            </NavLink>
          </div>
          <div className="container">
            <NavLink
              to="/user/account"
              className="link-style"
              activeStyle={{ color: "#FFA825" }}
            >
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="detail-tag" style={{ color: "#ffa825" }}>
            Set your Profile Username!
          </label>

          <NavLink
            className="link-style"
            to="/user/profile"
            activeStyle={{ color: "#FFA825" }}
          >
            View Profile
          </NavLink>
          <NavLink
            className="link-style"
            to="/user/account"
            activeStyle={{ color: "#FFA825" }}
          >
            View Account
          </NavLink>
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

export default ProfileMenu;
