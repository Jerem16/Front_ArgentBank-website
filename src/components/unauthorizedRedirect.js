import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectToken, selectUserData } from "../redux/selector/selector";
import { useSelector } from "react-redux";

export function UnauthorizedRedirect() {
    const navigate = useNavigate();
    const userData = useSelector(selectUserData);

    useEffect(() => {
        const isUserDataEmpty =
            !userData ||
            (typeof userData === "object" &&
                Object.keys(userData).length === 0);
        if (isUserDataEmpty) {
            navigate("/");
        }
    }, [userData, navigate]);
}
