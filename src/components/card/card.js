import { React, Component } from "react";
import { Card } from "antd";
import "./card.css";
import mokap from "./mokap.png";

const CardFilm = ({ title, discription, date, poster_path }) => {
    if(poster_path.trim() == '') {
      poster_path = mokap;
    }
    return (
    <Card className="card" styles={{ body: { padding: 0 } }}>
        <div className="container">
            <img className="photo" src={ poster_path }></img>
            <div className="text">
            <div className="title">
                <h5>{ title }</h5>
            </div>
            <div className="date">{ date }</div>
            <div className="genre">
                <ul>
                <li>Action</li>
                <li>Drama</li>
                </ul>
            </div>
            <div className="description">
                { discription }
            </div>
            </div>
        </div>
    </Card>
    )
}

export default CardFilm;