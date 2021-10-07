const INITIAL_STATE = {
  idusers: null,
  username: "",
  role: "",
  email: "",
  name: "",
  address: "",
  avatar: null,
  gender: null,
  age: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        idusers: action.payload.idusers,
        username: action.payload.username,
        role: action.payload.role,
        email: action.payload.email,
        name: action.payload.name,
        address: action.payload.address,
        avatar: action.payload.avatar,
        gender: action.payload.gender,
        age: action.payload.age,
      }
    case "LOGOUT":
      return INITIAL_STATE
    default:
      return state
  }
}

export default userReducer
