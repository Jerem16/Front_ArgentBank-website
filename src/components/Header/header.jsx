import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/selector/selector";
import { Loading } from "../Loader/Loader";
import LogoLink from "./LogoLink";
import UserNav from "./UserNav";

import "./header.scss";

function Header() {
    const isLoading = useSelector(selectIsLoading);
    return (
        <header>
            <nav className="main-nav">
                <LogoLink />
                {isLoading ? <Loading /> : <UserNav />}
            </nav>
        </header>
    );
}

export default Header;
