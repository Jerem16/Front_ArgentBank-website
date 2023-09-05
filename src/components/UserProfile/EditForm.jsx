import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../redux/actions/authActions";

import "./editForm.scss";

function EditForm({ onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.user.token);

    const userName = useSelector((state) => state.user.userData.userName);
    const firstName = useSelector((state) => state.user.userData.firstName);
    const lastName = useSelector((state) => state.user.userData.lastName);

    const [newUserName, setnewUserName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUserData = { userName: newUserName };
        await dispatch(updateProfile(token, updatedUserData));
        await navigate("/user");
        onClose();
    };
    const cancel = (e) => {
        e.preventDefault();
        onClose();
    };
    console.log("newUserName", newUserName);
    return (
        <div>
            <h1>
                Edit user info
                <br />
            </h1>
            <form className="UserSettings">
                <div>
                    <label htmlFor="user_Name">User Name</label>
                    <input
                        type="text"
                        id="user_Name"
                        placeholder={userName}
                        onChange={(e) => setnewUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="first_Name">First name</label>
                    <input
                        type="text"
                        id="first_Name"
                        value={firstName ?? ""}
                        readOnly
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="last_Name">Last name</label>
                    <input
                        type="text"
                        id="last_Name"
                        value={lastName ?? ""}
                        readOnly
                        disabled
                    />
                </div>
                <div className="wrapper-button buttons">
                    <button
                        type="submit"
                        className="edit-button"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                    <button
                        type="submit"
                        className="edit-button"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditForm;
