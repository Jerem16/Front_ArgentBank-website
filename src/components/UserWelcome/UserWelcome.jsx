import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserData } from "../../redux/selector/selector";
import EditForm from "../UserProfile/EditForm";
import Loader from "../Loader/Loader"; // Import du composant Loader
import "./UserWelcome.scss";

function UserProfile() {
    const userData = useSelector(selectUserData);

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsEditing(true);
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
                        {userData ? (
                            <>
                                {userData.firstName} {userData.lastName} !
                            </>
                        ) : (
                            <Loader />
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
