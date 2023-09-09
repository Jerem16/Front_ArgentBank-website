import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userData: "",
        isLoading: false,
        isUpdatingProfile: false,
        error: null,
    },
    reducers: {
        profileRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        profileSuccess: (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.error = null;
        },
        profileFailure: (state, action) => {
            state.isLoading = false;
            state.userData = null;
            state.error = action.payload;
        },
        updateProfileRequest: (state) => {
            state.isLoading = true;
            state.isUpdatingProfile = true;
            state.error = null;
        },
        updateProfileSuccess: (state, action) => {
            state.isLoading = false;
            state.isUpdatingProfile = false;
            state.userData = action.payload;
            state.error = null;
        },
        updateProfileFailure: (state, action) => {
            state.isLoading = false;
            state.isUpdatingProfile = false;
            state.error = null;
        },
        profileDelete: (state) => {
            state.userData = null;
        },
    },
});

export const {
    profileRequest,
    profileSuccess,
    profileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    profileDelete,
} = profileSlice.actions;

export default profileSlice.reducer;
