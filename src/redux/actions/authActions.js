import axios from "axios";
import { Navigate } from "react-router-dom";

// Action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";

export const LOG_OUT = "LOG_OUT";
// Action creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});
export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});
export const profileSuccess = (userData) => ({
    type: PROFILE_SUCCESS,
    payload: userData,
});
export const profileFailure = (error) => ({
    type: PROFILE_FAILURE,
    payload: error,
});

export const logOut = (error) => ({
    type: LOG_OUT,
});

// Fonction pour effectuer la demande de connexion
export const loginUser = (email, password, navigate) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            {
                email,
                password,
            }
        );

        const token = response.data.body.token;
        dispatch(loginSuccess(token));
        navigate("/user");

        if (response.status === 200) {
            try {
                const profileResponse = await axios.post(
                    "http://localhost:3001/api/v1/user/profile",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                dispatch(profileSuccess(profileResponse.data.body));
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération du profil :",
                    error
                );
            }
        }
    } catch (error) {
        dispatch(loginFailure(error.message));
        dispatch(profileFailure(error.message));
    }
};
