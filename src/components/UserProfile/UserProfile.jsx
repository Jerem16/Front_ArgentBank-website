import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EditForm from "./EditForm";
import "./userProfile.scss";

function UserProfile() {
    const userData = useSelector((state) => state.user.userData);

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Utilisez la fonction d'effet personnalisée

    const handleEditClick = () => {
        // Mettre à jour l'état d'édition pour ouvrir le formulaire
        setIsEditing(true);
        // Rediriger l'utilisateur vers la page de profil de l'utilisateur avec le paramètre d'édition
        navigate("/user/profile");
    };

    const handleEditFormClose = () => {
        setIsEditing(false);
    };

    return (
        <div className="main_head">
            {isEditing ? (
                <EditForm onClose={handleEditFormClose} />
            ) : (
                <>
                    <h1>
                        Welcome back
                        <br />
                        {userData && (
                            <>
                                {userData.firstName} {userData.lastName} !
                            </>
                        )}
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
