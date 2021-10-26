import Axios from "axios"

const TRX_API = "http://localhost:2000/transaction"

export const getTotalParcel = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }
    Axios.get(`${TRX_API}/cart`, axiosConfig)
      .then((res) =>
        dispatch({
          type: "GET_TOTAL_PARCEL",
          payload: res.data.totalParcel,
        })
      )
      .catch((err) =>
        dispatch({
          type: "GET_TOTAL_PARCEL",
          payload: 0,
        })
      )
  }
}
