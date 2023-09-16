import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Importez useNavigate ici
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import UserAccounts from "../../components/UserAccounts/UserAccounts";
import { selectUserData, selectToken } from "../../redux/selector/selector";
import { UnauthorizedRedirect } from "../../components/unauthorizedRedirect";
import "./userAccount.scss";

function UserAccount() {
    const userData = useSelector(selectUserData);
    const navigate = useNavigate(); // Utilisez useNavigate ici
    if (!userData) {
        UnauthorizedRedirect();// Gérez le cas où userData est undefined, par exemple, redirigez l'utilisateur vers la page de connexion.
    }
    // useEffect(() => {
    //     UnauthorizedRedirect();
    // }, [userData, navigate]); // Assurez-vous d'inclure navigate comme dépendance ici

    return (
        <main className="main bg-dark">
            <UserWelcome />
            <UserAccounts />
        </main>
    );
}

export default UserAccount;
