import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

export default combineReducers({
  adminReducer,
  userReducer,
});
