import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import "../../component/Side Nav/SideNav.css"
import { useLocation } from "react-router-dom";
import logo from "../../../img/RRlogo.png"


import { Context } from "../../store/appContext";
export const SideNav = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate() //  style={{ transform: "rotate(90deg)" }} 
    const location = useLocation(); // style={{ textOrientation: "sideways-right", writingMode: "vertical-lr" }}
    const token = sessionStorage.getItem('token') // style={{ display: token ? "block" : "none" }}
    return ( // style={{ display: token ? "block" : "none" }} 
        <div className="container" >
            <div className="row">
                <div className="col-2">
                    <div className="sidebar">

                        <ul className="sidebar-menu">
                            <li className="logo" style={{ transform: 'rotate(-180deg)' }}>

                                <img src={logo} style={{ height: "auto", width: "170px", marginRight: '55px', marginLeft: '0px', padding: '0px' }} onClick={() => navigate('/')} alt="" />
                            s</li>
                            {/* <li>
                                <a href="#" className={location.pathname == '/DISCOVER' ? `nav-link active` : 'nav-link'} style={{ textOrientation: "sideways-left", writingMode: "vertical-lr" }} onClick={() => navigate("/home")}  >

                                    DISCOVER
                                </a>
                            </li> */}
                            <li>
                                <a href="#" className={location.pathname.includes('home') ? `nav-link active` : 'nav-link'} onClick={() => navigate("/home")}>
                                    DISCOVER
                                </a>
                            </li>
                            <li>
                                <a href="#" className={location.pathname.includes('search') ? `nav-link active` : 'nav-link'} onClick={() => navigate("/search/artist")} >

                                    SEARCH
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className={location.pathname == '/discover' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/discover")} >

                                    EXTRA PAGE ;-/
                                </a> 
                            </li>
                            */}
                            <li>
                                <a href="#" className={location.pathname == '/inbox' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/inbox")} >

                                    MESSAGES
                                </a>
                            </li>
                            {/* <li>
                    <a href="#"  className={location.pathname=='/search'?`nav-link active`:'nav-link'} onClick={()=>navigate("/search")} >
                        <span className="icon">
                           
                        </span>
                        Notifications
                    </a>
                </li> */}

                            <li>
                                <a href="#" className={location.pathname == '/post' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/post")} >
                                    <span className="icon">

                                    </span>
                                    POST
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link" style={{ color: 'white' }} onClick={() => sessionStorage.clear('token')} >

                                    LOGOUT
                                </a>
                            </li>
                            <li>
                                <a href="#" className={location.pathname == '/profile/myaccount' ? `nav-link active` : 'nav-link'} onClick={() => { navigate(`/profile/myaccount`) }} >
                                    {/* <img className="icon rounded-circle" src="https://avatars.githubusercontent.com/u/1743919?v=4" alt="Profile icon" /> */}
                                    PROFILE
                                </a>
                            </li>
                        </ul>


                    </div>


                </div>
            </div>

        </div>


    );
};
