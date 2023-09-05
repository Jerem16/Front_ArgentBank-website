import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoLink from "./LogoLink";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/authActions";

import "./header.scss";

function Header() {
    const token = useSelector((state) => state.user.token);
    const userData = useSelector((state) => state.user.userData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = (e) => {
        e.preventDefault();
        dispatch(logOut());
        navigate("/");
    };

    return (
        <header>
            <nav className="main-nav">
                <LogoLink />
                <div>
                    {userData && userData.userName ? (
                        <>
                            <Link to="/login" className="main-nav-item">
                                <i className="fa fa-user-circle"></i>{" "}
                                {userData.userName}
                            </Link>
                            <Link
                                className="main-nav-item"
                                onClick={handleSignOut}
                            >
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="main-nav-item">
                            <i className="fa fa-user-circle"></i> Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
