import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./editForm.scss";

function EditForm() {
    const userName = useSelector((state) => state.user.userData.userName);
    const firstName = useSelector((state) => state.user.userData.firstName);
    const lastName = useSelector((state) => state.user.userData.lastName);

    const [newUserName, setnewUserName] = useState("");

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
                    <button type="submit" className="edit-button">
                        Save
                    </button>
                    <button type="submit" className="edit-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditForm;
