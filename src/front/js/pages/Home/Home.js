import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Feed } from "../../component/HomePageAssets/Feed";

import { Context } from "../../store/appContext";
export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const centerStyle = {
        margin: '0 auto', textAlign: 'center', display: 'block', // This makes the label behave like a block-level element
    }
    return (
        <div className="container red-background" style={{ margin: '0 auto', }}>
            <br />
            <br />

            <form style={{ margin: '0 auto', }}>
                <div class="form-group"  >
                    <h1 style={{ textAlign: "center", fontVariant: 'small-caps' }}>Create New Account</h1>
                    <br />
                    <label for="exampleInputName" style={centerStyle}>USER NAME</label>
                    <input type="user name" style={centerStyle} class="form-control w-50" id="exampleInputUserName1" placeholder="Music Buff🎶" />
                </div>

                <label for="exampleInputEmail1" style={centerStyle}>EMAIL</label>
                <input type="email" class="form-control w-50" style={centerStyle} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your email" />
                <small id="emailHelp" class="form-text text-muted" style={centerStyle}>We'll never share your email with anyone else.</small>

                <div class="form-group">
                    <label for="exampleInputPassword1" style={centerStyle} >PASSWORD</label>
                    <input type="password" style={centerStyle} class="form-control w-50" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div class="form-group">
                    <label for="exampleInputZipCode1" style={centerStyle} >ZIP CODE</label>
                    <input type="zipcode" style={centerStyle} class="form-control w-50" id="exampleInputZipCode1" placeholder="Zip Code" />
                </div>

                <div class="form-check">


                </div>
                <button type="submit" class="btn btn-warning" style={centerStyle}>Sign up!</button>
            </form>
            <br />
            <br />
            <br />
            <h3 style={{ textAlign: "center", fontVariant: 'small-caps' }}>Already Registered? Log in here.</h3>
            <br />
            <form>
                <div class="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }}>

                        <label for="exampleInputEmail1" style={centerStyle}>User Name</label>
                        <input type="email" class="form-control w-80" style={centerStyle} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
                        <small id="emailHelp" class="form-text text-muted" style={centerStyle}>Welcome Back!</small>
                    </div>
                    <div>
                        <label for="exampleInputPassword1" style={centerStyle}>Password</label>
                        <input type="password" style={centerStyle} class="form-control w-80" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                </div>
                <div class="form-check" style={centerStyle}>


                </div>
                <button type="submit" style={centerStyle} class="btn btn-warning">Submit</button>
            </form>
        </div>
    );
}

