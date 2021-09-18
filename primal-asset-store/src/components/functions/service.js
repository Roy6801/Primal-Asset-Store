import axios from "axios";

const { REACT_APP_API_BASE_URL } = process.env;

const service = {
  auth: (user) => {
    return axios.post(REACT_APP_API_BASE_URL + "user/auth/", { ...user });
  },
  verify: (googleId) => {
    return axios.get(REACT_APP_API_BASE_URL + "user/profile/" + googleId);
  },
  editProfile: (googleId, user) => {
    return axios.put(REACT_APP_API_BASE_URL + "user/profile/" + googleId, {
      ...user,
    });
  },
  deleteAccount: (googleId) => {
    return axios.delete(REACT_APP_API_BASE_URL + "user/profile/" + googleId);
  },
};

export default service;
