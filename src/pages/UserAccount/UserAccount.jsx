import React from "react";
import { useSelector } from "react-redux";
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import UserAccounts from "../../components/UserAccounts/UserAccounts";
import { UnauthorizedRedirect } from "../../components/unauthorizedRedirect";
import "./userAccount.scss";

function UserAccount() {
    const userData = useSelector((state) => state.profile.userData);
    const token = useSelector((state) => state.auth.token);

    UnauthorizedRedirect(userData, token);
    return (
        <main className="main bg-dark">
            <UserWelcome />
            <UserAccounts />
        </main>
    );
}

export default UserAccount;
