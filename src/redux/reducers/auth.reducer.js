import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    LOG_OUT,
} from "../actions/authActions.js";

const initialState = {
    token: null,
    isLoading: false,
    error: null,
    userData: "",
    isUpdatingProfile: false,
    updateProfileError: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload,
                error: null,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                token: null,
                error: action.payload,
            };

        case PROFILE_SUCCESS:
            return {
                ...state,
                userData: action.payload,
            };

        case PROFILE_FAILURE:
            return {
                ...state,
                userData: null,
                error: action.payload,
            };

        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isUpdatingProfile: true,
                updateProfileError: null,
            };

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdatingProfile: false,
                userData: action.payload,
                updateProfileError: null,
            };
            
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                isUpdatingProfile: false,
                updateProfileError: action.payload,
            };

        case LOG_OUT:
            return {
                ...state,
                token: null,
                userData: null,
            };

        default:
            return state;
    }
};

export default authReducer;
