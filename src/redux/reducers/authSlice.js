import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.token = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.token = null;
            state.error = action.payload;
        },
        logOut: (state) => {
            state.token = null;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logOut } =
    authSlice.actions;

export default authSlice.reducer;
