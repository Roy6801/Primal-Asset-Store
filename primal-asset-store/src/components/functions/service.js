import axios from "axios";

const { REACT_APP_API_BASE_URL } = process.env;

const service = {
  auth: (user) => {
    return axios.post(REACT_APP_API_BASE_URL + "user/auth/", user);
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
  usernameExists: (userName) => {
    return axios.get(REACT_APP_API_BASE_URL + "user/profile/exist/" + userName);
  },
  assetList: (googleId) => {
    return axios.get(REACT_APP_API_BASE_URL + "user/asset/userid/" + googleId);
  },
  assetPublish: (assetInfo) => {
    if (assetInfo.typeId) {
      return axios.post(REACT_APP_API_BASE_URL + "game/asset/", assetInfo);
    } else {
      return axios.post(REACT_APP_API_BASE_URL + "ui/asset/", assetInfo);
    }
  },
  assetUpload: (assetInfo, file) => {
    var data = new FormData();
    for (const [key, val] of Object.entries(assetInfo)) {
      data.append(key, val);
    }
    data.append("fileName", file.name);
    data.append("fileSize", file.size);
    data.append("fileData", file);
    return axios.post(
      REACT_APP_API_BASE_URL + "user/asset/assetid/" + assetInfo.assetId,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  assetEdit: (assetInfo) => {
    return axios.put(
      REACT_APP_API_BASE_URL + "user/asset/edit/assetid/" + assetInfo.assetId,
      assetInfo
    );
  },
};

export default service;
