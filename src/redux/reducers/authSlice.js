import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectLogin } from "../selector/selector";
import { fetchUserProfile } from "../reducers/profileSlice";
import {
    handleFetchAction,
    handleResolveAction,
    handleRejectedAction,
    handleResetAction,
} from "./apiHandlers";
export const loginUser = (email, password) => async (dispatch, getState) => {
    const status = selectLogin(getState()).status;
    if (status === "pending" || status === "updating") {
        return;
    }
    dispatch(fetching());
    try {
        const response = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            {
                email,
                password,
            }
        );

        const token = await response.data.body.token;
        dispatch(resolved(token));

        await fetchUserProfile(token)(dispatch, getState);
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "void",
        token: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        fetching: (state) => {
            handleFetchAction(state);
        },
        resolved: (state, action) => {
            handleResolveAction(state, action, { name: "token" });
        },
        loginFailure: (state, action) => {
            handleRejectedAction(state, action, { name: "token" });
        },
        logOut: (state) => {
            handleResetAction(state, { name: "token" });
        },
    },
});

export const { fetching, resolved, loginFailure, logOut } = authSlice.actions;

export default authSlice.reducer;
