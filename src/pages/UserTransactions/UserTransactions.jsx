import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "../../components/UserWelcome/UserWelcome";
import AccountTransactions from "../../components/AccountTransactions/AccountTransactions";
import Account from "../../components/Account/Account";
import { UnauthorizedRedirect } from "../../components/unauthorizedRedirect";
import "./userTransactions.scss";

function UserAccount() {
    const userData = useSelector((state) => state.profile.userData);
    const token = useSelector((state) => state.auth.token);

    UnauthorizedRedirect(userData, token);
    return (
        <main className="main bg-dark">
            <Account />
            <AccountTransactions />
        </main>
    );
}

export default UserAccount;
