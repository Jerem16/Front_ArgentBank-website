import axios from "axios";

import {
    loginRequest,
    loginSuccess,
    loginFailure,
} from "../reducers/authSlice";
import {
    profileRequest,
    profileSuccess,
    profileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
} from "../reducers/profileSlice";


export const loginUser = (email, password) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            {
                email,
                password,
            }
        );

        const token = await response.data.body.token;
        dispatch(loginSuccess(token));

        await fetchUserProfile(token)(dispatch);
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const fetchUserProfile = (token) => async (dispatch) => {
    dispatch(profileRequest());
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
        dispatch(profileSuccess(userData));
    } catch (error) {
        dispatch(profileFailure(error.message));
    }
};

export const updateProfile =
    (token, newUserName, navigate) => async (dispatch) => {
        dispatch(updateProfileRequest());
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
            dispatch(updateProfileSuccess(userData));
        } catch (error) {
            dispatch(updateProfileFailure(error.message));
        }
    };
