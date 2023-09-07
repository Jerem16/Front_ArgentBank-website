import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectToken, selectUserData } from "../../redux/selector/selector";
export function UnauthorizedRedirect(userData, token) {
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si userData est null ou undefined et rediriger vers la page d'accueil le cas échéant
        if (
            !selectUserData ||
            (typeof selectUserData === "object" &&
                Object.keys(selectUserData).length === null) ||
            !selectToken ||
            (typeof selectToken === "object" &&
                Object.keys(selectToken).length === null)
        ) {
            navigate("/");
        }
    }, [userData, token, navigate]); // Ajoutez "token" comme dépendance ici
}
