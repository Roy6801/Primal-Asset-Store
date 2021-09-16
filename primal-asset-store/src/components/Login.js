import { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import ProfileMenu from "./navigation/ProfileMenu";
import useToken from "./functions/useToken";
import service from "./functions/service";
import cart from "./static/Cart.svg";
import "./stylesheets/Home.css";

const Login = () => {
  // window.localStorage.removeItem("primal-UIG-asset-store-G10");
  const { REACT_APP_CLIENT_ID } = process.env;

  const { token, setToken } = useToken();

  const [showMenu, setShowMenu] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowMenu(false);
  //   }, 10000);
  // }, []);

  // console.log(showMenu);

  const onSuccess = (resp) => {
    // get user profile on login and encrypt data
    const user = {
      email1: resp.profileObj.email,
      lastName: resp.profileObj.familyName,
      firstName: resp.profileObj.givenName,
      googleId: resp.profileObj.googleId,
      imageURL: resp.profileObj.imageUrl,
    };

    // verify or register user and save user data locally

    service
      .verify(user)
      .then((resp) => {
        setToken(JSON.stringify(user));
      })
      .catch((err) => {
        service.auth(user).then((resp) => {
          setToken(JSON.stringify(user));
        });
      });
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
    service
      .verify(JSON.parse(token))
      .then((resp) => {
        setToken(token);
      })
      .catch((err) => {
        setToken();
        window.localStorage.removeItem("primal-UIG-asset-store-G10");
      });

    if (showMenu) {
      return (
        <div style={{width:"30%"}}>
          <div className="menu-section">
            <img src={cart} className="cart" />
            <img
              src={JSON.parse(token).imageURL}
              className="profile-view"
              onClick={(e) => setShowMenu(false)}
            />
          </div>
          <div className="profile-menu">
            <ProfileMenu setToken={setToken} user={JSON.parse(token)} />
          </div>
        </div>
      );
    }
    return (
      <div className="menu-section">
        <img src={cart} className="cart" />
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
