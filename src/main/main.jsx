import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './main.css';
import { PrivateListMenu, CurrentPrivateList } from '../privateFormsAndFunctions/m_private_forms';

function Main() {

    const my_dispatch = useDispatch();
    const selected_private_or_bis_FromRedux = String(useSelector(mState => mState.m_Redus_select_Priv_or_Bis.select_priv_bis));

    return (
        <main>
            <div className="mainLeft">

                <div className="mainLeftTop">

                    <div className={(selected_private_or_bis_FromRedux === "priv") ? "leftContennerForButton isActiv_ContennerForButton" : "leftContennerForButton"} >

                        <button
                            className='btnPrivateList'
                            onClickCapture={() => {
                                my_dispatch(
                                    { type: "SET_select_priv_bis", select_Priv_or_Bis: ("priv") }
                                )
                            }}
                        >
                            ToDo organizer
                        </button>
                    </div>

                    {/* 
                    <div className='rightContennerForButton'>
 */}
                    <div className={(selected_private_or_bis_FromRedux === "bis") ? "rightContennerForButton isActiv_ContennerForButton" : "rightContennerForButton"} >

                        <button
                            className='btnBusinessAndProgects'
                            onClickCapture={() => {
                                my_dispatch(
                                    { type: "SET_select_priv_bis", select_Priv_or_Bis: ("bis") }
                                )
                            }}

                        >
                            Work projects
                        </button>
                    </div>
                </div>

                <div className="mainLeftBottom">

                    <div className={(selected_private_or_bis_FromRedux === "priv") ? "leftMenu_PrivateContent" : "mDisplayNone"} >

                        <div className="privateContent">
                            <PrivateListMenu />
                        </div>
                    </div>

                    <div className={(selected_private_or_bis_FromRedux === "bis") ? "leftMenu_BisContent" : "mDisplayNone"}   >
                    This section is in progress <br />
                    </div>

                </div>

            </div>

            <div className="mainCenter">

                <div className={(selected_private_or_bis_FromRedux === "priv") ? "privatContent" : "mDisplayNone"} >
                    < CurrentPrivateList />
                </div>

                <div className={(selected_private_or_bis_FromRedux === "bis") ? "bisContent" : "mDisplayNone"}   >
                    
                </div>
            </div>

        </main >
    )
}

//--------------------
export default Main;


