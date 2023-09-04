import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditForm from "./EditForm";
import "./userProfile.scss";

function UserProfile() {
    const userData = useSelector((state) => state.user.userData);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        // Mettre à jour l'état d'édition pour ouvrir le formulaire
        setIsEditing(true);
        // Rediriger l'utilisateur vers la page de profil de l'utilisateur avec le paramètre d'édition
        navigate("/user/profile");
    };

    return (
        <div className="main_head">
            {isEditing ? (
                <EditForm />
            ) : (
                <>
                    <h1>
                        Welcome back
                        <br />
                        {userData.firstName} {userData.lastName}!
                    </h1>
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit Name
                    </button>
                </>
            )}
        </div>
    );
}
export default UserProfile;
