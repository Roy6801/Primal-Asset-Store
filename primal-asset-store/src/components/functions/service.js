import axios from "axios";

const { REACT_APP_API_BASE_URL } = process.env;

const service = {
  auth: (user) => {
    return axios.post(REACT_APP_API_BASE_URL + "user/auth/", { ...user });
  },
  verify: (user) => {
    return axios.get(REACT_APP_API_BASE_URL + "user/auth/" + user.googleId);
  },
};

export default service;
