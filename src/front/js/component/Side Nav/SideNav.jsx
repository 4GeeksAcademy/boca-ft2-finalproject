import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import "../../component/Side Nav/SideNav.css"
import { useLocation } from "react-router-dom";
import logo from "../../../img/RRlogo.png"


import { Context } from "../../store/appContext";
export const SideNav = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const location = useLocation();

    return (
        <div className="container" style={{ display: location.pathname == "/" ? "none" : "block" }}>
            <div className="row">
                <div className="col-2">
                    <div className="sidebar">

                        <ul className="sidebar-menu">
                            <li>

                                <img src={logo} style={{ height: "auto", width: "150px", marginRight: '-100%' }} alt="" />

                            </li>
                            <li>
                                <a href="#" className={location.pathname == '/home' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/home")}  >
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Home" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="#000000" strokeLinejoin="round" strokeWidth="2px"></path>
                                        </svg>
                                    </span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className={location.pathname.includes('search') ? `nav-link active` : 'nav-link'} onClick={() => navigate("/search/artist")} >
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Search" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></path>
                                            <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                                        </svg>
                                    </span>
                                    Search
                                </a>
                            </li>
                            <li>
                                <a href="#" className={location.pathname == '/discover' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/discover")} >
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Explore" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></polygon>
                                            <polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                                            <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></circle>
                                        </svg>
                                    </span>
                                    Discover
                                </a>
                            </li>
                            <li>
                                <a href="#" className={location.pathname == '/inbox' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/inbox")} >
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Messenger" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="1.739px"></path>
                                            <path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path>
                                        </svg>
                                    </span>
                                    Messages
                                </a>
                            </li>
                            {/* <li>
                    <a href="#"  className={location.pathname=='/search'?`nav-link active`:'nav-link'} onClick={()=>navigate("/search")} >
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Notifications" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <title>Notifications</title>
                                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                        </span>
                        Notifications
                    </a>
                </li> */}
                            <li>
                                <a href="#" className={location.pathname == '/post' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/post")} >
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="New post" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></path>
                                            <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                                            <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                                        </svg>
                                    </span>
                                    Post
                                </a>
                            </li>
                            <li>
                                <a href="#" className={location.pathname == '/myaccount' ? `nav-link active` : 'nav-link'} onClick={() => navigate("/myaccount")} >
                                    <img className="icon rounded-circle" src="https://avatars.githubusercontent.com/u/1743919?v=4" alt="Profile icon" />
                                    Profile
                                </a>
                            </li>
                        </ul>


                    </div>


                </div>
            </div>

        </div>


    );
};
