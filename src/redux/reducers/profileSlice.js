import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userData: "",
        isUpdatingProfile: false,
        updateProfileError: null,
    },
    reducers: {
        profileSuccess: (state, action) => {
            state.userData = action.payload;
        },
        profileFailure: (state, action) => {
            state.userData = null;
            state.error = action.payload;
        },
        updateProfileRequest: (state) => {
            state.isUpdatingProfile = true;
            state.updateProfileError = null;
        },
        updateProfileSuccess: (state, action) => {
            state.isUpdatingProfile = false;
            state.userData = action.payload;
            state.updateProfileError = null;
        },
        updateProfileFailure: (state, action) => {
            state.isUpdatingProfile = false;
            state.updateProfileError = action.payload;
        },
        profileDelete: (state) => {
            state.userData = null;
        },
    },
});

export const {
    profileSuccess,
    profileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    profileDelete,
} = profileSlice.actions;

export default profileSlice.reducer;
