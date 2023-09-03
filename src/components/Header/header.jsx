import React from "react";
import { Link } from "react-router-dom";
import LogoLink from "./LogoLink";

import "./header.scss";

function Header() {
    return (
        <header>
            <nav className="main-nav">
                <LogoLink />
                <div>
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
