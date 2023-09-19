import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, deco } from "../../redux/reducers/authSlice";
import { clearStoredToken } from "../../redux/reducers/token";
import { selectToken, selectUserData } from "../../redux/selector/selector";

import "./header.scss";

function UserNav() {
    const token = useSelector(selectToken);
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = (e) => {
        e.preventDefault();
        navigate("/");
        clearStoredToken();
        dispatch(deco());
    };
    // useEffect(() => {
    //     if (token) {
    //         dispatch(getUserProfile());
    //     }
    // }, [dispatch]);
    return (
        <div>
            {userData && userData.userName ? (
                <>
                    <Link to="/user" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>{" "}
                        {userData.userName}
                    </Link>
                    <Link className="main-nav-item" onClick={handleSignOut}>
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
    );
}

export default UserNav;
