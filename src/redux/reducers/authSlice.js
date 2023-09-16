import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUserData } from "../selector/selector";
import { splitAndStoreToken, clearStoredToken } from "./token";

const URL = "http://localhost:3001/api/v1/user";

const ApiBase = async (url, data = {}, M = axios.post, headers = {}) => {
    const response = await M(url, data, { headers });
    return response.data.body;
};

export const loginUser = (email, password) => async (dispatch, getState) => {
    try {
        const response = await ApiBase(`${URL}/login`, {
            email,
            password,
        });
        const resultValue = await response.token;

        dispatch(getToken(resultValue));
        // const token = selectToken(getState());
        // console.log("mon token", token, "mon resultValue", resultValue);
        // if (token === resultValue) {
        //     console.log("Les valeurs sont identiques.");
        // } else {
        //     console.log("Les valeurs sont différentes.");
        //     // Faites quelque chose en conséquence, comme gérer l'erreur ou effectuer une action particulière.
        // }
        splitAndStoreToken(resultValue);
        // await getUserProfile(resultValue)(dispatch);
    } catch (error) {
        dispatch(rejected(error.message));
    }
};

export const getUserProfile = () => async (dispatch, getState) => {
    const token = selectToken(getState());

    // console.log("getUserProfile mon token", token, "mon resultValue");
    // if (token) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await ApiBase(
            `${URL}/profile`,
            {},
            axios.post,
            headers
        );
        const resultValue = await response;
        await dispatch(getData(resultValue));
        // const userData = selectUserData(getState());
        // await console.log("getUserProfile getData", resultValue);
        // await console.log("userData token", userData);
    } catch (error) {
        dispatch(rejected(error.message));
    }
    // }
};

export const updateProfile = (token, body) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = await ApiBase(
            `${URL}/profile`,
            body,
            axios.put,
            headers
        );
        const resultValue = await response.userName;
        await dispatch(putUserName(resultValue));
    } catch (error) {
        dispatch(rejected(error.message));
    }
};
export const deco = () => async (dispatch) => {
    try {
        clearStoredToken();
        dispatch(logout());
    } catch (error) {
        dispatch(rejected(error.message));
    }
};

const initialState = {
    status: "void",
    token: null,
    userData: null,
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        start: (draft) => {
            if (draft.status === "resolved") {
                draft.status = "void";
            }
            // console.log("users type :start after", draft.status);
        },
        fetching: (draft) => {
            if (draft.status === "void") {
                draft.status = "pending";
            } else if (draft.status === "rejected") {
                draft.error = null;
                draft.status = "pending";
            } else if (draft.status === "resolved") {
                draft.status = "updating";
            } else if (
                draft.status === "pending" ||
                draft.status === "updating"
            ) {
                draft.status = "resolved";
                draft.error = null;
            } else {
                draft.status = "pending";
            }
            // console.log("users type :fetching after", draft.status);
        },
        resolved: (state) => {
            if (state.status === "pending" || state.status === "updating") {
                state.status = "resolved";
                state.error = "";
                // console.log("users type :resolved", state.status);
            }
        },
        getToken: (state, action) => {
            state.token = action.payload;
            if (state.status === "pending") {
                return;
            } else {
                userSlice.caseReducers.fetching(state);

                userSlice.caseReducers.resolved(state);
            }
        },
        getData: (state, action) => {
            userSlice.caseReducers.start(state);

            if (state.status === "pending") {
                return;
            } else {
                userSlice.caseReducers.fetching(state);
                state.userData = action.payload;
                userSlice.caseReducers.resolved(state);
            }
        },
        putUserName: (state, action) => {
            if (state.status === "pending" || state.status === "updating") {
                return;
            } else {
                userSlice.caseReducers.fetching(state);
                state.userData.userName = action.payload;
                userSlice.caseReducers.resolved(state);
            }
        },
        rejected: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        logout: (state) => {
            state.status = "void";
            state.token = null;
            state.userData = null;
            state.error = null;
        },
    },
});

export const { getToken, getData, putUserName, rejected, logout } =
    userSlice.actions;

export default userSlice.reducer;
