
import React from "react";
import "./burgerMenu.css"

function BurgerMenu() {
    return (
        <div className="block_Humburger">

            <input id="toggle_01" type="checkbox" />
            {/* в строке ниже - "htmlFor" в синтаксисе обычного html-документа пишется просто как "for" */}
            <label className="My_Btn_Humburher" htmlFor="toggle_01">
                <div className="MyHumbPolosa-1"></div>
                <div className="MyHumbPolosa-2"></div>
                <div className="MyHumbPolosa-3"></div>
            </label>

            <div className="MenuSlider">
                {/* в строке ниже - "htmlFor" в синтаксисе обычного html-документа пишется просто как "for" */}
                <label className="btn_Close" htmlFor="toggle_01">
                    <span className="span_close-1"></span>
                    <span className="span_close-2"></span>
                </label>

                <ul className="menu__box_1">
                    <li>
                        <a className="menu__item" href="index.html">
                            <span className="Menu_Slader_Text-1">
                                &bull; Главная
                            </span>
                        </a>
                    </li>

                    <li>
                        <a className="menu__item" href="portfolio.html">
                            <span className="Menu_Slader_Text-1">
                                &bull; Портфолио
                            </span>
                        </a>
                    </li>

                    <li>
                        <a className="menu__item" href="O_firme.html">
                            <span className="Menu_Slader_Text-1">
                                &bull; О фирме
                            </span>
                        </a>
                    </li>
                </ul>

                <ul className="menu__box_2">
                    <li>
                        Контакты:
                    </li>

                    <li>
                        <div className="menu__box_2-2">
                            <a href="tel:+380676877974">
                                <img src="img/Kont_Tel_1-1.png" alt="Tel-2" height="100%" />
                            </a>
                        </div>
                    </li>

                    <li>
                        <div className="menu__box_2-2">
                            <a href="tel:+380504728831">
                                <img src="img/Kont_Tel_2-2.png" alt="Tel-2" height="100%" />
                            </a>
                        </div>
                    </li>f

                    <li>
                        <div className="menu__box_2-2">
                            <a href="viber://chat?number=380504728831">
                                <img src="img/Kont_Viber-2.png" alt="Viber" height="100%" />
                            </a>
                        </div>
                    </li>

                    <li>
                        <div className="menu__box_2-2">
                            <a href="mailto:ole-t@i.uaole-t@i.ua">
                                <img src="img/Kont_Mail-2.png" alt="E-mail" height="100%" />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BurgerMenu;