import { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import ProfileMenu from "./navigation/ProfileMenu";
import useToken from "./functions/useToken";
import krypton from "./functions/krypton";
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
      email: krypton.encrypt(resp.profileObj.email),
      familyName: krypton.encrypt(resp.profileObj.familyName),
      givenName: krypton.encrypt(resp.profileObj.givenName),
      googleId: krypton.encrypt(resp.profileObj.googleId),
      imageUrl: krypton.encrypt(resp.profileObj.imageUrl),
      userName: krypton.encrypt(""),
      mobileNo: krypton.encrypt(""),
    };

    // save user data locally
    setToken(JSON.stringify(user));
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
            src={krypton.decrypt(JSON.parse(token).imageUrl)}
            className="profile-view"
            onClick={(e) => setShowMenu(false)}
          />
          <div className="profile-menu">
            <ProfileMenu
              googleId={krypton.decrypt(JSON.parse(token).googleId)}
            />
          </div>
        </div>
      );
    }
    return (
      // <div>
      //   <button
      //     onClick={(e) => {
      //       setToken();
      //       window.localStorage.removeItem("primal-UIG-asset-store-G10");
      //     }}
      //   >
      //     Sign out
      //   </button>
      // </div>
      <img
        src={krypton.decrypt(JSON.parse(token).imageUrl)}
        className="profile-view"
        onClick={(e) => setShowMenu(true)}
      />
    );
  }
};

export default Login;
