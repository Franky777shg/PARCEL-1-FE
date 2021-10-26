import Axios from "axios"

const AUTH_API = "https://api-parcel-1.purwadhikafs2.com/auth"

export const onLogin = (data) => ({
  type: "LOGIN",
  payload: data,
})

export const keepLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    if (token) {
      const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
      Axios.post(`${AUTH_API}/keep-login`, {}, axiosConfig)
        .then((res) => {
          return dispatch({
            type: "LOGIN",
            payload: res.data,
          })
        })
        .catch((err) => {
          localStorage.removeItem("token")
        })
    }
  }
}

export const onLogout = () => ({
  type: "LOGOUT"
})
