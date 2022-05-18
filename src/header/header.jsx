import React from "react";
import "./_header-css/_header.css";
import NavMainMenu from "../navMainMenu/navMainMenu";
import BurgerMenu from "../burgerMenu/burgerMenu";

function Header() {
    return (
        <header>
            <div className="headerContenner">

                <div className="h_cont_left">
                    <div className="logoBlock">
                        Advanced ToDo Organizer
                        <BurgerMenu />
                    </div>
                </div>

                <div className="h_cont_center">
                    <NavMainMenu />
                </div>

                <div className="h_cont_right">
                    Account
                </div>
            </div>

        </header>
    )
}

export default Header;




