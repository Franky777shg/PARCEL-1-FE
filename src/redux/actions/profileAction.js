import Axios from "axios";

const URL_PROFILE = "https://api-parcel-1.purwadhikafs2.com/profile/updateProfileData";

export const updateData = (data) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
    Axios.put(`${URL_PROFILE}`, data, axiosConfig).then((res) => {
      return dispatch({
        type: "UPDATE",
        payload: res.data,
      });
    });
  };
};

export const uploadAvatar = (data) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_AVATAR",
      payload: data,
    });
  };
};
export const removeAvatar = () => {
  return (dispatch) => {
    return dispatch({
      type: "REMOVE_AVATAR",
    });
  };
};
