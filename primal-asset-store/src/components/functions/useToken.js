import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    return window.localStorage.getItem("primal-UIG-asset-store-G10");
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    window.localStorage.setItem("primal-UIG-asset-store-G10", userToken);
    setToken(userToken);
  };

  return { token, setToken: saveToken };
};

export default useToken;
