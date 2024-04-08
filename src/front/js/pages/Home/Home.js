import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Feed } from "../../component/HomePageAssets/Feed";

import { Context } from "../../store/appContext";
export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    return (
        <div className="container red-background" style={{ display: "flexbox" }}>
            <br />
            <br />
            <br />
            <br />
            <form>
                <div class="form-group">
                    <h2 style={{ textAlign: "center", fontVariant: 'small-caps' }}>Log In</h2>
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <form>
                <div class="form-group">
                    <h2 style={{ textAlign: "center", fontVariant: 'small-caps' }}>Sign Up!</h2>
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

