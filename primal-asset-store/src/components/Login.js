import { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import ProfileMenu from "./navigation/ProfileMenu";
import useToken from "./functions/useToken";
import krypton from "./functions/krypton";
import service from "./functions/service";
import "./stylesheets/Home.css";

const Login = () => {
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
      familyName: resp.profileObj.familyName,
      givenName: resp.profileObj.givenName,
      googleId: resp.profileObj.googleId,
      imageUrl: resp.profileObj.imageUrl,
    };

    // save user data locally

    service.auth(user).then((resp) => {
      console.log(resp.data);
      setToken(JSON.stringify(user));
    });
  };

  const onFailure = (resp) => {
    console.log(resp);
    alert("Login Failed!!");
  };

  if (!token) {
    return (
      <div>
        <GoogleLogin
          clientId={REACT_APP_CLIENT_ID}
          buttonText="Sign in"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
    );
  } else {
    if (showMenu) {
      return (
        <div>
          <img
            src={JSON.parse(token).imageUrl}
            className="profile-view"
            onClick={(e) => setShowMenu(false)}
          />
          <div className="profile-menu">
            <ProfileMenu
              setToken={setToken}
              googleId={JSON.parse(token).googleId}
            />
          </div>
        </div>
      );
    }
    return (
      <img
        src={krypton.decrypt(JSON.parse(token).imageUrl)}
        className="profile-view"
        onClick={(e) => setShowMenu(true)}
      />
    );
  }
};

export default Login;
