import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

let devToolsValue = true; // Par défaut, devTools = true
if (/Firefox/.test(navigator.userAgent)) {
    // Si le navigateur est Firefox
    devToolsValue = process.env.NODE_ENV !== "production";
}

const store = configureStore({
    reducer: rootReducer,
    devTools: devToolsValue,
    middleware: [thunk],
});

export default store;
