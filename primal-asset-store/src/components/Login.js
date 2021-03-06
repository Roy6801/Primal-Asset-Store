import { useState, useEffect, useRef } from "react";
import GoogleLogin from "react-google-login";
import ProfileMenu from "./navigation/ProfileMenu";
import useToken from "./functions/useToken";
import service from "./functions/service";
import { BsFillCartCheckFill } from "react-icons/bs";
import "./stylesheets/Home.css";
import { NavLink } from "react-router-dom";

const { REACT_APP_CLIENT_ID } = process.env;

const Login = () => {
  const [user, setUser] = useState();

  const userValue = useRef(user);

  const { token, setToken } = useToken();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (userValue.current !== user) {
      const tokenData = {
        email1: user.email1,
        lastName: user.lastName,
        firstName: user.firstName,
        googleId: user.googleId,
        imageURL: user.imageURL,
      };
      userValue.current = user;
      setToken(JSON.stringify(tokenData));
    }
  }, [user, setToken]);

  useEffect(() => {
    if (showMenu) {
      setTimeout(() => {
        setShowMenu(false);
      }, 20000);
    }
  }, [showMenu, setShowMenu]);

  const onSuccess = (resp) => {
    // get user profile on login and encrypt data
    const oauthData = {
      email1: resp.profileObj.email,
      lastName: resp.profileObj.familyName,
      firstName: resp.profileObj.givenName,
      googleId: resp.profileObj.googleId,
      imageURL: resp.profileObj.imageUrl,
    };

    // verify or register user and save user data locally

    if (!token) {
      service
        .verify(oauthData.googleId)
        .then((resp) => {
          setUser(resp.data);
        })
        .catch((err) => {
          console.log(oauthData);
          service.auth(oauthData).then((resp) => {
            setUser(resp.data);
          });
        });
    }
  };

  const onFailure = (resp) => {
    alert("Login Failed!!");
  };

  if (!token) {
    return (
      <div className="menu-section">
        <GoogleLogin
          clientId={REACT_APP_CLIENT_ID}
          buttonText="Sign in"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
    );
  } else {
    if (!token) {
      service
        .verify(JSON.parse(token).googleId)
        .then((resp) => {
          setUser(resp.data);
        })
        .catch((err) => {
          setToken();
          window.localStorage.removeItem("primal-UIG-asset-store-G10");
        });
    }

    if (showMenu) {
      return (
        <div className="menu-section">
          <NavLink style={{ alignSelf: "center" }} to="/cart">
            <BsFillCartCheckFill size="2em" color="white" />
          </NavLink>
          <img
            src={JSON.parse(token).imageURL}
            className="profile-view"
            onClick={(e) => setShowMenu(false)}
          />
          <div className="profile-menu">
            <ProfileMenu setToken={setToken} />
          </div>
        </div>
      );
    }
    return (
      <div className="menu-section">
        <NavLink style={{ alignSelf: "center" }} to="/cart">
          <BsFillCartCheckFill size="2em" color="white" />
        </NavLink>
        <img
          src={JSON.parse(token).imageURL}
          className="profile-view"
          onClick={(e) => setShowMenu(true)}
        />
      </div>
    );
  }
};

export default Login;
