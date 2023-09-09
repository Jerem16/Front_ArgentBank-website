import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectToken, selectUserData } from "../redux/selector/selector";
import { useSelector } from "react-redux";

export function UnauthorizedRedirect() {
    const navigate = useNavigate();
    const userData = useSelector(selectUserData); // Utilisez le sélecteur ici
    const token = useSelector(selectToken); // Utilisez le sélecteur ici

    useEffect(() => {
        // Vérifier si userData est null ou undefined et rediriger vers la page d'accueil le cas échéant
        if (
            !userData || // Utilisez userData ici
            (typeof userData === "object" &&
                Object.keys(userData).length === 0) || // Utilisez userData ici
            !token || // Utilisez token ici
            (typeof token === "object" && Object.keys(token).length === 0) // Utilisez token ici
        ) {
            navigate("/");
        }
    }, [userData, token, navigate]);
}
