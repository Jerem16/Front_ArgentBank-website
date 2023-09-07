import { combineReducers } from "redux";
import authReducer from "./authSlice.js";
import profileReducer from "./profileSlice.js";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
});
