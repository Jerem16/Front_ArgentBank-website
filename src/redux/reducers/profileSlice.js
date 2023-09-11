import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectProfile } from "../selector/selector";
import {
    handleFetchAction,
    handleResolveAction,
    handleRejectedAction,
    handleResetAction,
} from "./apiHandlers";

export const fetchUserProfile = (token) => async (dispatch, getState) => {
    const status = selectProfile(getState()).status;
    if (status === "pending" || status === "updating") {
        return;
    }

    dispatch(fetching());
    try {
        const response = await axios.post(
            "http://localhost:3001/api/v1/user/profile",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const userData = await response.data.body;
        dispatch(resolved(userData));
    } catch (error) {
        dispatch(profileFailure(error.message));
    }
};

export const updateProfile =
    (token, newUserName, navigate) => async (dispatch, getState) => {
        const status = selectProfile(getState()).status;
        if (status === "pending") {
            return;
        }
        dispatch(fetchProfileUpdate());
        try {
            const response = await axios.put(
                "http://localhost:3001/api/v1/user/profile",
                newUserName,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const userData = response.data.body;
            dispatch(resolveProfileUpdate(userData));
        } catch (error) {
            dispatch(profileFailure(error.message));
        }
    };

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        status: "void",
        userData: "",
        isLoading: false,
        error: null,
    },
    reducers: {
        fetching: (state) => {
            handleFetchAction(state);
        },
        resolved: (state, action) => {
            handleResolveAction(state, action, { name: "userData" });
        },
        profileFailure: (state, action) => {
            handleRejectedAction(state, action, { name: "userData" });
        },
        fetchProfileUpdate: (state) => {
            profileSlice.caseReducers.fetching(state);
        },
        resolveProfileUpdate: (state, action) => {
            handleResolveAction(state, action, { name: "userData" });
        },
        profileDelete: (state) => {
            handleResetAction(state, { name: "userData" });
        },
    },
});

export const {
    fetching,
    resolved,
    profileFailure,
    fetchProfileUpdate,
    resolveProfileUpdate,
    profileDelete,
} = profileSlice.actions;

export default profileSlice.reducer;
