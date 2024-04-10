import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Feed } from "../../component/HomePageAssets/Feed";

import { Context } from "../../store/appContext";
export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const centerStyle = {
        margin: '0 auto', textAlign: 'center', display: 'block', // This makes the label behave like a block-level element
    }
    return (
        <div className="container red-background" style={{ margin: '0 auto', }}>
            <h3 style={{ textAlign: "center", fontVariant: 'small-caps' }}>Already Registered? Log in here.</h3>
            <br />
            <form>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }}>

                        <label htmlFor="exampleInputEmail1" style={centerStyle}>User Name</label>
                        <input type="email" className="form-control w-80" style={centerStyle} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
                        <small id="emailHelp" className="form-text text-muted" style={centerStyle}>Welcome Back!</small>
                    </div>
                    <div>
                        <label htmlFor="exampleInputPassword1" style={centerStyle}>Password</label>
                        <input type="password" style={centerStyle} className="form-control w-80" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                </div>
                <div className="form-check" style={centerStyle}>
                </div>
                <button type="submit" style={centerStyle} className="btn btn-warning" onClick={()=>navigate("/home")}>Submit</button>
                <button type="submit" className="btn btn-warning" style={centerStyle} onClick={()=>navigate("/createaccount")}>New User</button>
            </form>
        </div>
    );
}

