import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function UnauthorizedRedirect(userData, token) {
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si userData est null ou undefined et rediriger vers la page d'accueil le cas échéant
        if (
            !userData ||
            (typeof userData === "object" &&
                Object.keys(userData).length === 0) ||
            !token ||
            (typeof token === "object" && Object.keys(token).length === 0)
        ) {
            navigate("/");
        }
    }, [userData, token, navigate]); // Ajoutez "token" comme dépendance ici
}
