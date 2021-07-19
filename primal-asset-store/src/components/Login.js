import GoogleLogin from "react-google-login";

const Login = () => {
  const { REACT_APP_CLIENT_ID } = process.env;

  const googleResponse = (resp) => {
    console.log(resp);
  };

  return (
    <div>
      <GoogleLogin
        clientId={REACT_APP_CLIENT_ID}
        buttonText="SIGNIN"
        onSuccess={googleResponse}
        onFailure={googleResponse}
      />
    </div>
  );
};

export default Login;
