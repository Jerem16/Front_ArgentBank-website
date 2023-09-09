import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

let devToolsValue = true; // Par défaut, devTools = true
if (/Firefox/.test(navigator.userAgent)) {
    // Si le navigateur est Firefox
    devToolsValue = process.env.NODE_ENV !== "production";
}

const store = configureStore({
    reducer: rootReducer,
    devTools: devToolsValue,
});

export default store;
