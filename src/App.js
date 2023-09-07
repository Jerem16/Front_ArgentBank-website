import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/header";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserAccount from "./pages/UserAccount/UserAccount";
import Error from "./pages/Error/Error";

import Footer from "./components/Footer/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<UserAccount />} />
                <Route path="/user/profile" element={<UserAccount />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
