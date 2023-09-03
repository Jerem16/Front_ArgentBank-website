import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./loginForm.scss";

function LoginForm() {
    // Définir des états pour stocker les données utilisateur
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Vous pouvez utiliser les données utilisateur (username, password et rememberMe) ici
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);

        // Vous pouvez envoyer les données à votre backend pour l'authentification ici
    };

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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

                <Link to="/user" type="submit" className="sign-in-button">
                    Sign In
                </Link>
                {/* <button type="submit" className="sign-in-button">
                    Sign In
                </button> */}
            </form>
        </section>
    );
}

export default LoginForm;
