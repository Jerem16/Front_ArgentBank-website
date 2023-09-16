import React, { useEffect } from "react";
import LogoLink from "./LogoLink";
import UserNav from "./UserNav";
import { getUserProfile, getToken } from "../../redux/reducers/authSlice"; // Importez la fonction getUserProfile ici
import { useDispatch } from "react-redux";
import { combineStoredToken } from "../../redux/reducers/token"; // Assurez-vous d'importer correctement la fonction combineStoredToken

import "./header.scss";
function Header() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = combineStoredToken();

        if (token) {
            dispatch(getToken(token));
            dispatch(getUserProfile(token));
        }
    }, [dispatch]);
    return (
        <header>
            <nav className="main-nav">
                <LogoLink />
                <UserNav />
            </nav>
        </header>
    );
}

export default Header;
