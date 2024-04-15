import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Inbox = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const ta_l = {
        textAlign: 'left'
    }
    const fakeData =
        [{ name: 'Jimbo', time: '5 mins', lastMessage: 'Jimbo: I like your taste!' },
        { name: 'Lena', time: '1 hour', lastMessage: 'Lena: Birds are cool' },
        { name: 'InternetMan3', time: '1 hour', lastMessage: 'InternetMan3: I prefer onions' },
        { name: 'WaterMan', time: '2 hours', lastMessage: 'WaterMan: I enjoy water' },
        { name: 'FoodPerson', time: '3 hours', lastMessage: 'FoodPerson: I hate onions' },
        { name: 'NotaRobot', time: '4 hours', lastMessage: 'NotaRobot: I am a real human please belie...' },
        { name: 'CellEnthusiast', time: '5 hours', lastMessage: `CellEnthusiast: I love mitochondria and chlo...` },
        { name: 'DogLover', time: '5 hours', lastMessage: `DogLover: I LOVE DOGS!!!!` }]
    const fakeMessages = [
        { name: 'You', message: `That's cool, I also like reading books` },
     { name: 'Jimbo', message: `What do you do for fun?` },
      { name: 'You', message: `Listening to music is my favorite pasttime activity` },
       { name: 'Jimbo', message: `What's your favorite music?` },
        { name: 'You', message: 'I like jazz and heavy metal' },
        { name: 'Jimbo', message: 'I like your taste!' }
    ]
    return (
        <div classNameName="container">
            <div className="'row" style={{ display: 'flex' }}>
                <div className="col">
                    <h3 style={{ color: 'white' }}>Messages</h3>
                    <ol>
                        {fakeData.map((item, index) => {
                            // Creating the fake messages from other people here from fakedata array
                            return (<div className="blurbg">
                                <div className="card-body">
                                    <h5 className="card-title" style={{
                                        textAlign: 'left',
                                        color: 'white'
                                    }}>{item.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted" style={ta_l}>{item.time}</h6>
                                    <p className="card-text" style={ta_l}>{item.lastMessage}</p>

                                </div>
                            </div>)
                        })}
                    </ol>
                </div>
                <div className="col">
                    <ol style={{ listStyle: 'none' }}>
                        {fakeMessages.map((item, index) => {
                            return (<li className="blurbg">
                                <div className="card-body">
                                    <h5 className="card-title" style={{
                                        textAlign: 'left',
                                        color: 'white'
                                    }}>{item.name}</h5>
                                    <p className="card-text" style={ta_l}>{item.message}</p>
                                    {/* Filling in data from my fake message array here */}
                                </div>
                            </li>)
                        })}
                        <li>

                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <br />
                            <button type="button" class="btn btn-warning" style={{ width: '100%' }}>Send</button>
                        </li>
                    </ol>

                </div>
            </div>
        </div>
    );
};
