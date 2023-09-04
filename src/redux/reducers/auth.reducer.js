import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
    LOG_OUT,
} from "../actions/authActions.js";

const initialState = {
    token: null,
    isLoading: false,
    error: null,
    userData: "",
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
