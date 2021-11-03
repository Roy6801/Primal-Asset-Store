import { useState } from "react";
import service from "../functions/service";
import { NavLink } from "react-router-dom";
import { BoxLoading } from "react-loadingg";
import "../stylesheets/Home.css";
import "../stylesheets/ProfileMenu.css";

const ProfileMenu = ({ setToken }) => {
  const [user, setUser] = useState();
  const [favCount, setFavCount] = useState("$$$NULL$$$");

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

    return (
      <div className="profile-menu-display">
        <BoxLoading size="small" color="#FFA825" />
      </div>
    );
  } else {
    if (user.userName) {
      if (favCount === "$$$NULL$$$") {
        service
          .userFavs(googleId)
          .then((resp) => {
            setFavCount(resp.data.count);
          })
          .catch((err) => {
            setFavCount(0);
          });
        return null;
      } else {
        return (
          <div>
            <div className="profile-menu-display">
              <div className="profile-menu-display-section1 detail-tag">
                <label>User</label>
                <label>Name</label>
                <label>Coins</label>
                <label>Favorites</label>
              </div>
              <div className="profile-menu-display-section1 ">
                <label>-</label>
                <label>-</label>
                <label>-</label>
                <label>-</label>
              </div>
              <div className="profile-menu-display-section1 detail-info">
                <label>{user.userName}</label>
                <label>{user.firstName + " " + user.lastName}</label>
                <label>{user.coins}</label>
                <label>{favCount}</label>
              </div>
            </div>
            <div className="container-menu">
              <NavLink
                to="/user/profile"
                className="link-style"
                activeStyle={{ color: "#FFA825" }}
              >
                View Profile
              </NavLink>
            </div>
            <div className="container-menu">
              <NavLink
                to="/user/account"
                className="link-style"
                activeStyle={{ color: "#FFA825" }}
              >
                View Account
              </NavLink>
            </div>
            <div className="container-menu">
              <NavLink
                to="/user/publish"
                className="link-style"
                activeStyle={{ color: "#FFA825" }}
              >
                Publish Asset
              </NavLink>
            </div>
            <div className="container-menu">
              <NavLink
                to="/orders"
                className="link-style"
                activeStyle={{ color: "#FFA825" }}
              >
                Your Orders
              </NavLink>
            </div>
            <div className="container-menu">
              <NavLink
                to="/favorites"
                className="link-style"
                activeStyle={{ color: "#FFA825" }}
              >
                Favorites
              </NavLink>
            </div>
            <div className="container-menu">
              <NavLink
                to="/redeem"
                className="link-style"
                activeStyle={{ color: "#FFA825" }}
              >
                Redeem Cash
              </NavLink>
            </div>

            <button
              className="btn-use10"
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
