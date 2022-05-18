import React, { useState, useEffect, useRef } from "react";
import "./navMainMenu.css";
import { f_activateMainMenu, f_deActivateMainMenu } from "./_js/_navMainMenu.js";
import { Vector_Type01_Bottom, Vector_Type01_Right } from "../vectors/vector_Type01/vector_Type01.jsx";


function NavMainMenu() {
    const [styleList, setStyleList] = useState("navMainMenu");
    return (
        // важно - присваиваем блоку nav произвольное значение свойства tabIndex, чтобы он начал поддерживать фокусировку, поскольку по умолчанию элементы типа DIV, NAV и т.п. не поддерживают получение фокуса
        <nav className={styleList} id="navMainMenu"
            tabIndex={1002}
            onClick={() => setStyleList("navMainMenu hoverActivate")}
            onBlur={() => setStyleList("navMainMenu")}
            onMouseLeave={() => setStyleList("navMainMenu")} >

            <ul className="ul_navGorizontal" >

                <li className="menuBlock_Level_1">
                    <div className="menuBlock_Struct CHANGE_MENU_FOR_MaimMenu">
                        <div className="menuBlock_Struct_Left"></div>
                        <div className="menuBlock_Struct_Ctnter">
                            language</div>
                        <div className="menuBlock_Struct_Rigt">
                            <Vector_Type01_Bottom />
                        </div>
                    </div>

                    <ul>
                        <div className="distanseMenuLevel_2"></div>

                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                English
                            </div>
                        </li>

                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                - - -
                            </div>
                        </li>

                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                - - -
                            </div>
                        </li>
                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                - - -
                            </div>
                        </li>



                    </ul>
                </li>

                <li className="menuBlock_Level_1">
                    <div className="menuBlock_Struct CHANGE_MENU_FOR_MaimMenu">
                        <div className="menuBlock_Struct_Left"></div>
                        <div className="menuBlock_Struct_Ctnter">Colors </div>
                        <div className="menuBlock_Struct_Rigt">
                            <Vector_Type01_Bottom />
                        </div>
                    </div>

                    <ul>
                        <div className="distanseMenuLevel_2"></div>


                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                White
                            </div>
                        </li>

                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                - - -
                            </div>
                        </li>

                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                - - -
                            </div>
                        </li>
                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                - - -
                            </div>
                        </li>

                    </ul>
                </li>


                <li className="menuBlock_Level_1">
                    <div className="menuBlock_Struct CHANGE_MENU_FOR_MaimMenu">
                        <div className="menuBlock_Struct_Left"></div>
                        <div className="menuBlock_Struct_Ctnter">
                            Menu</div>
                        <div className="menuBlock_Struct_Rigt">
                            <Vector_Type01_Bottom />
                        </div>
                    </div>

                    <ul>
                        <div className="distanseMenuLevel_2"></div>
                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                my submenu - level 2
                            </div>
                        </li>

                        <li className="menuBlock_Level_2">
                            <div className="menuKontentBlock">
                                my submenu - level 2
                            </div>
                        </li>

                        <li className="menuBlock_Level_2">

                            <div className="menuBlock_Struct CHANGE_MENU_FOR_SubMenu">
                                <div className="menuBlock_Struct_Left">-</div>
                                <div className="menuBlock_Struct_Ctnter">Submenu - 2</div>
                                <div className="menuBlock_Struct_Rigt">
                                    <Vector_Type01_Right />
                                </div>
                            </div>


                            <ul>
                                <li className="menuBlock_Level_3">
                                    <div className="menuKontentBlock">
                                        submenu 3
                                    </div>
                                </li>
                                <li className="menuBlock_Level_3">
                                    <div className="menuKontentBlock">
                                    submenu 3
                                    </div>
                                </li>
                                <li className="menuBlock_Level_3">
                                    <div className="menuBlock_Struct CHANGE_MENU_FOR_SubMenu">
                                        <div className="menuBlock_Struct_Left">-</div>
                                        <div className="menuBlock_Struct_Ctnter">Submenu 3</div>
                                        <div className="menuBlock_Struct_Rigt">
                                            <Vector_Type01_Right />
                                        </div>
                                    </div>

                                    <ul>
                                        <li className="menuBlock_Level_4">
                                            <div className="menuKontentBlock">
                                            submenu 4
                                            </div>
                                        </li>
                                        <li className="menuBlock_Level_4">
                                            <div className="menuBlock_Struct CHANGE_MENU_FOR_SubMenu">
                                                <div className="menuBlock_Struct_Left">-</div>
                                                <div className="menuBlock_Struct_Ctnter">Submenu 4</div>
                                                <div className="menuBlock_Struct_Rigt">
                                                    <Vector_Type01_Right />
                                                </div>
                                            </div>

                                            <ul>
                                                <li className="menuBlock_Level_4">
                                                    <div className="menuKontentBlock">
                                                    submenu 5
                                                    </div>
                                                </li>

                                                <li className="menuBlock_Level_4">
                                                    <div className="menuKontentBlock">
                                                    submenu 5
                                                    </div>
                                                </li>

                                                <li className="menuBlock_Level_4">
                                                    <div className="menuKontentBlock">
                                                    submenu 5
                                                    </div>
                                                </li>
                                            </ul>

                                        </li>
                                        <li className="menuBlock_Level_4">
                                            <div className="menuKontentBlock">
                                            submenu 4
                                            </div>
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <div className="menuKontentBlock">
                                    submenu 3
                                    </div>
                                </li>

                            </ul>
                        </li>

                        <li>
                            <div className="menuKontentBlock">
                                my submenu - level 2
                            </div>
                        </li>

                    </ul>
                </li>

            </ul>

        </nav>
    )
}

export default NavMainMenu;