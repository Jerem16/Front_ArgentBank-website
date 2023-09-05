import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

import "./loginForm.scss";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const authState = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            // Gérer la validation des champs
            alert("Veuillez remplir tous les champs.");
            return;
        }

        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);

        await dispatch(loginUser(email, password, navigate));
        await navigate("/user");
    };

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-remember">
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>

                <button type="submit" className="sign-in-button">
                    Sign In
                </button>
            </form>
        </section>
    );
}

export default LoginForm;
