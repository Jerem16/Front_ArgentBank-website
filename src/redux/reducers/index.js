import { combineReducers } from "redux";
import authReducer from "./auth.reducer.js";

export default combineReducers({
    user: authReducer,
});
