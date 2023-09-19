import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LoginData from "./pages/LoginData/LoginData";
import UserAccount from "./pages/UserAccount/UserAccount";
import UserTransactions from "./pages/UserTransactions/UserTransactions";
import Error404 from "./pages/Error404/Error404";
import ErrorAuth from "./pages/ErrorAuth/ErrorAuth";
import Footer from "./components/Footer/Footer";
import { getUserProfile, getMyToken } from "./redux/reducers/authSlice";
import { combineStoredToken } from "./redux/reducers/token";
import {
    selectToken,
    selectUserData,
    selectAuth,
} from "./redux/selector/selector";

function App() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const data = useSelector(selectUserData);
    const authenticated = useSelector(selectAuth);

    useEffect(() => {
        const memToken = combineStoredToken();

        if (memToken && !token) {
            dispatch(getMyToken(memToken));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (token && !data) {
            dispatch(getUserProfile());
        }
    }, [dispatch, token, data]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/data_user" element={<LoginData />} />
                </>

                {authenticated ? (
                    <>
                        <Route path="/user" element={<UserAccount />} />
                        <Route path="/user/profile" element={<UserAccount />} />
                        <Route
                            path="/user/account/:id"
                            element={<UserTransactions />}
                        />
                    </>
                ) : (
                    <Route path="*" element={<ErrorAuth />} />
                )}

                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
