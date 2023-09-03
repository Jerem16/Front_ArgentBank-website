import React from "react";
import "./userProfile.scss";

function UserProfile() {
    return (
        <div className="main_head">
            <h1>
                Welcome back
                <br />
                Tony Jarvis!
            </h1>
            <button className="edit-button">Edit Name</button>
        </div>
    );
}

export default UserProfile;
