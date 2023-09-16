import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "../../components/UserWelcome/UserWelcome";
import AccountTransactions from "../../components/AccountTransactions/AccountTransactions";
import Account from "../../components/Account/Account";
import { UnauthorizedRedirect } from "../../components/unauthorizedRedirect";
import "./userTransactions.scss";
import { selectUserData, selectToken } from "../../redux/selector/selector";

function UserAccount() {
    const userData = useSelector(selectUserData);

    if (!userData) {
        UnauthorizedRedirect(); // Gérez le cas où userData est undefined, par exemple, redirigez l'utilisateur vers la page de connexion.
    }
    return (
        <main className="main bg-dark">
            <Account />
            <AccountTransactions />
        </main>
    );
}

export default UserAccount;
