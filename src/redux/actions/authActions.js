import axios from "axios";

// -------- LOGIN_REQUEST------------
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginRequest = () => ({ type: LOGIN_REQUEST });

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

// -------- PROFILE_REQUEST------------
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";

export const profileSuccess = (userData) => ({
    type: PROFILE_SUCCESS,
    payload: userData,
});

export const profileFailure = (error) => ({
    type: PROFILE_FAILURE,
    payload: error,
});

// -------- PROFILE_UPDATE------------
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export const updateProfileRequest = () => ({ type: UPDATE_PROFILE_REQUEST });

export const updateProfileSuccess = (userData) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: userData,
});

export const updateProfileFailure = (error) => ({
    type: UPDATE_PROFILE_FAILURE,
    payload: error,
});

// -------- LOG_OUT------------
export const LOG_OUT = "LOG_OUT";

export const logOut = () => ({
    type: LOG_OUT,
});

// Fonction pour effectuer la demande de connexion
export const loginUser = (email, password) => async (dispatch, navigate) => {
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

        // Appeler fetchUserProfile après avoir obtenu le token
        await fetchUserProfile(token)(dispatch);

        // Si la connexion réussit, appeler fetchUserProfile
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const fetchUserProfile = (token) => async (dispatch) => {
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

export const updateProfile = (token, newUserName, navigate) => async (dispatch) => {
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
