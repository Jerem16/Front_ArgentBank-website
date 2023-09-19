import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken, selectStatus } from "../selector/selector";
import { splitAndStoreToken, clearStoredToken } from "./token";

const URL = "http://localhost:3001/api/v1/user";

const ApiBase = async (url, data = {}, M = axios.post, headers = {}) => {
    const response = await M(`${URL}${url}`, data, { headers });
    return response.data.body;
};

export const loginUser = (email, password) => async (dispatch, getState) => {
    const status = selectStatus(getState());
    try {
        if (status === "pending" || status === "updating") {
            return;
        }
        dispatch(actions.fetching());

        const response = await ApiBase(`/login`, {
            email,
            password,
        });
        const resultValue = await response.token;

        dispatch(actions.getToken(resultValue));
        splitAndStoreToken(resultValue);
    } catch (error) {
        dispatch(actions.rejected(error.message));
    }
};

export const getUserProfile = () => async (dispatch, getState) => {
    const status = selectStatus(getState());
    if (status === "pending" || status === "updating") {
        return;
    } else {
        const token = selectToken(getState());
        if (token) {
            dispatch(actions.fetching());

            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };
                const response = await ApiBase(
                    `/profile`,
                    {},
                    axios.post,
                    headers
                );
                const resultValue = await response;

                await dispatch(actions.getData(resultValue));
            } catch (error) {
                dispatch(actions.rejected(error.message));
            }
        }
    }
};

export const updateProfile = (token, body) => async (dispatch, getState) => {
    const status = selectStatus(getState());
    try {
        if (status === "pending" || status === "updating") {
            return;
        }
        dispatch(actions.fetching());

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = await ApiBase(`/profile`, body, axios.put, headers);
        const resultValue = await response.userName;

        await dispatch(actions.putUserName(resultValue));
    } catch (error) {
        dispatch(actions.rejected(error.message));
    }
};

export const getMyToken = (memToken) => async (dispatch, getState) => {
    const token = selectToken(getState());
    if (!token) {
        dispatch(actions.sendToken(memToken));
    }
};

export const deco = () => async (dispatch) => {
    clearStoredToken();
    dispatch(actions.logout());
};

const initialState = {
    status: "void",
    isAuth: false,
    isLoading: false,
    token: null,
    userData: null,
    error: null,
};

const { actions, reducer } = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetching: (draft) => {
            draft.isLoading = true;
            if (draft.status === "void" || draft.status === "updating") {
                draft.status = "pending";
                return;
            }
            if (draft.status === "resolved") {
                draft.status = "updating";
                return;
            }
            if (draft.status === "rejected") {
                draft.error = null;
                draft.status = "pending";
                return;
            }
            return;
        },

        getToken: (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                draft.isAuth = true;
                draft.isLoading = false;
                draft.status = "resolved";
                draft.token = action.payload;
            }
        },

        getData: (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                draft.isLoading = false;
                draft.status = "resolved";
                draft.userData = action.payload;
            }
        },
        putUserName: (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                draft.isLoading = false;
                draft.status = "resolved";
                draft.userData.userName = action.payload;
            }
        },

        rejected: (draft, action) => {
            draft.status = "rejected";
            draft.error = action.payload;
        },

        sendToken: (draft, action) => {
            draft.isAuth = true;
            draft.token = action.payload;
        },

        logout: (draft) => {
            draft.status = "void";
            draft.token = null;
            draft.userData = null;
            draft.error = null;
            draft.isAuth = false;
            draft.isLoading = false;
        },
    },
});

export default reducer;
