import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken, selectAuth, selectStatus } from "../selector/selector";
import { splitAndStoreToken, clearStoredToken } from "./token";

const URL = "http://localhost:3001/api/v1/user";

const ApiBase = async (url, data = {}, M = axios.post, headers = {}) => {
    const response = await M(`${URL}${url}`, data, { headers });
    return response.data.body;
};

export const loginUser = (email, password) => async (dispatch, getState) => {
    dispatch(actions.fetching());
    try {
        // dispatch(loading(true));
        const response = await ApiBase(`/login`, {
            email,
            password,
        });
        const resultValue = await response.token;

        dispatch(actions.getToken(resultValue));
        splitAndStoreToken(resultValue);
        // dispatch(loading(false));
    } catch (error) {
        dispatch(actions.rejected(error.message));
    }
};
export const getMyToken = (memToken) => async (dispatch, getState) => {
    // const navigate = useNavigate();
    const token = selectToken(getState());
    if (!token) {
        dispatch(actions.sendToken(memToken));
        // navigate("/data_user");
    }
};
export const getUserProfile = () => async (dispatch, getState) => {
    const token = selectToken(getState());
    console.log("getUserProfile :", token);
    // const data = selectUserData(getState());
    if (token) {
        dispatch(actions.fetching());
        try {
            // dispatch(loading(true));
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };
            const response = await ApiBase(`/profile`, {}, axios.post, headers);
            const resultValue = await response;
            await dispatch(actions.getData(resultValue));
            dispatch(loading(false));
        } catch (error) {
            // dispatch(rejected(error.message));
        }
    }
};

export const updateProfile = (token, body) => async (dispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = await ApiBase(`/profile`, body, axios.put, headers);
        const resultValue = await response.userName;
        await dispatch(actions.putUserName(resultValue));
    } catch (error) {
        // dispatch(rejected(error.message));
    }
};
export const deco = () => async (dispatch) => {
    try {
        clearStoredToken();
        dispatch(actions.logout());
    } catch (error) {
        // dispatch(rejected(error.message));
    }
};
export const loading = (value) => async (dispatch) => {
    // console.log("isLoading before", isLoading);
    dispatch(actions.isLoading(value));
    // console.log("isLoading after", isLoading);
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
        start: (draft) => {
            if (draft.status === "resolved") {
                draft.status = "void";
            }
            // console.log("users type :start after", draft.status);
        },
        fetching: (draft) => {
            draft.isLoading = true;

            if (draft.status === "void" || draft.status === "updating") {
                // on passe en pending
                draft.status = "pending";
                return;
            }
            // si le statut est rejected
            if (draft.status === "rejected") {
                // on supprime l'erreur et on passe en pending
                draft.error = null;
                draft.status = "pending";
                return;
            }
            // si le statut est resolved
            if (draft.status === "resolved") {
                // on passe en updating (requête en cours mais des données sont déjà présentent)
                draft.status = "updating";
                return;
            }
            // sinon l'action est ignorée
            return;
        },
        auth: (draft) => {
            console.log("auth before", draft.isAuth);
            draft.isAuth = true;
            console.log("auth after", draft.isAuth);
        },
        isLoading: (draft, action) => {
            // console.log("isLoading before", draft.isLoading);
            draft.isLoading = action.payload;
            // console.log("isLoading after", draft.isLoading);
        },
        resolved: (draft) => {
            draft.isLoading = false;
            if (draft.status === "pending" || draft.status === "updating") {
                draft.status = "resolved";
                draft.error = "";

                // console.log(
                //     "users type :resolved after",
                //     state.status,
                //     "resolved after",
                //     state.isLoading
                // );
            }
        },
        getToken: (draft, action) => {
            console.log("getToken draft.status before", draft.status);
            draft.isAuth = true;
            draft.isLoading = false;
            draft.status = "resolved";
            // if (draft.status === "pending" || draft.status === "updating") {

            //     return;
            // } else {
            // reducer.caseReducers.fetching(draft);

            draft.token = action.payload;

            draft.error = "";
            // reducer.caseReducers.resolved();
            console.log("getToken draft.status after", draft.status);
            // }
            // draft.isLoading = false;
        },
        sendToken: (draft, action) => {
            draft.isAuth = true;
            draft.token = action.payload;
        },
        getData: (draft, action) => {
            // userSlice.caseReducers.start(state);

            // if (
            //     draft.status === "pending" ||
            //     draft.status === "updating" ||
            //     draft.status === "resolved"
            // ) {
            //     return;
            // } else {
            // console.log("users type :getData", state.status);
            // userSlice.caseReducers.fetching(state);
            draft.userData = action.payload;
            // state.isAuth = true;
            // userSlice.caseReducers.resolved(state);
            // userSlice.caseReducers.auth(state);
            // }
        },
        putUserName: (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                return;
            } else {
                // userSlice.caseReducers.fetching(state);
                draft.userData.userName = action.payload;
                // userSlice.caseReducers.resolved(state);
            }
        },
        rejected: (draft, action) => {
            draft.status = "rejected";
            draft.error = action.payload;
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

// export const {
//     fetching,
//     auth,
//     isLoading,
//     getToken,
//     sendToken,
//     getData,
//     putUserName,
//     rejected,
//     logout,
// } = reducer.actions;

export default reducer;
