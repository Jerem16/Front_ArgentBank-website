import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Importez votre réducteur ici

const reduxDevtools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
    
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;
