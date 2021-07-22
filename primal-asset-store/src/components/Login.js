import GoogleLogin from "react-google-login";
import useToken from "./functions/useToken";
import krypton from "./functions/krypton";

const Login = () => {
  //window.localStorage.removeItem("primal-UIG-asset-store-G10");
  const { REACT_APP_CLIENT_ID } = process.env;

  const { token, setToken } = useToken();

  const onSuccess = (resp) => {
    console.log(resp.profileObj);
    const user = {
      email: krypton.encrypt(resp.profileObj.email),
      familyName: krypton.encrypt(resp.profileObj.familyName),
      givenName: krypton.encrypt(resp.profileObj.givenName),
      googleId: krypton.encrypt(resp.profileObj.googleId),
      imageUrl: krypton.encrypt(resp.profileObj.imageUrl),
      userName: krypton.encrypt(""),
      mobileNo: krypton.encrypt(""),
    };
    console.log(user);
    const deUser = {
      email: krypton.decrypt(user.email),
      familyName: krypton.decrypt(user.familyName),
      givenName: krypton.decrypt(user.givenName),
      googleId: krypton.decrypt(user.googleId),
      imageUrl: krypton.decrypt(user.imageUrl),
      userName: krypton.decrypt(user.userName),
      mobileNo: krypton.decrypt(user.mobileNo),
    };
    console.log(deUser);
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
    return (
      <div>
        <button
          onClick={(e) => {
            setToken();
            window.localStorage.removeItem("primal-UIG-asset-store-G10");
          }}
        >
          Sign out
        </button>
      </div>
    );
  }
};

export default Login;
