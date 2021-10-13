const INITIAL_STATE = {
  totalParcel: 0,
}

const transactionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TOTAL_PARCEL":
      return {
        ...state,
        totalParcel: action.payload,
      }
    default:
      return state
  }
}

export default transactionReducer
