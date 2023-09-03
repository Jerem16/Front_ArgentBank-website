import React from "react";
import UserProfile from "../../components/UserProfile/UserProfile";
import Account from "../../components/Account/Account";
import "./userAccount.scss";

function UserAccount() {
    return (
        <main className="main bg-dark">
            <UserProfile />
            <Account />
        </main>
    );
}

export default UserAccount;
