import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "../../components/UserProfile/UserProfile";
import Account from "../../components/Account/Account";
import { UnauthorizedRedirect } from "../../components/UserProfile/unauthorizedRedirect";
import "./userAccount.scss";

function UserAccount() {
    const userData = useSelector((state) => state.profile.userData);
    const token = useSelector((state) => state.auth.token);

    UnauthorizedRedirect(userData, token);
    return (
        <main className="main bg-dark">
            <UserProfile />
            <Account />
        </main>
    );
}

export default UserAccount;
