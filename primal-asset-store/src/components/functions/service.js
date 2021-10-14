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
  assetDetail: (assetId) => {
    return axios.get(REACT_APP_API_BASE_URL + "user/asset/assetid/" + assetId);
  },
  assetEdit: (assetInfo) => {
    return axios.put(
      REACT_APP_API_BASE_URL + "user/asset/edit/assetid/" + assetInfo.assetId,
      assetInfo
    );
  },
  viewPublisher: (userName) => {
    return axios.get(
      REACT_APP_API_BASE_URL + "user/view/publisher/" + userName
    );
  },
  getUserReview: (assetId, userId) => {
    return axios.get(
      `${REACT_APP_API_BASE_URL}user/asset/review/${assetId}/${userId}`
    );
  },
  editUserReview: (assetId, userId, data) => {
    return axios.put(
      `${REACT_APP_API_BASE_URL}user/asset/review/${assetId}/${userId}`,
      data
    );
  },
  deleteUserReview: (assetId, userId) => {
    return axios.delete(
      `${REACT_APP_API_BASE_URL}user/asset/review/${assetId}/${userId}`
    );
  },
  postUserReview: (data) => {
    return axios.post(REACT_APP_API_BASE_URL + "user/asset/review/post/", data);
  },
  allUserReviews: (assetId) => {
    return axios.get(REACT_APP_API_BASE_URL + "user/asset/reviews/" + assetId);
  },
  thumbnailsUpload: (assetInfo, files) => {
    var data = new FormData();
    for (const [key, val] of Object.entries(assetInfo)) {
      data.append(key, val);
    }
    data.append("fileCount", files.length);
    for (const [key, val] of Object.entries(files)) {
      data.append(key + "_file", val.name);
      data.append(val.name, val);
    }
    return axios.post(
      REACT_APP_API_BASE_URL + "user/asset/thumbnails/" + assetInfo.assetId,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  getThumbnails: (assetId) => {
    return axios.get(
      REACT_APP_API_BASE_URL + "user/asset/thumbnails/" + assetId
    );
  },
  discover: (typeId, filter) => {
    return axios.get(`${REACT_APP_API_BASE_URL}${typeId}/discover/${filter}`);
  },
};

export default service;
