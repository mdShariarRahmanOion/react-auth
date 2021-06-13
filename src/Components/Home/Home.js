import React from 'react';
import { Card } from 'react-bootstrap';
import bike from '../../Utilitis/images/bike.png';
import car from '../../Utilitis/images/car.png';
import bus from '../../Utilitis/images/bus.png';
import train from '../../Utilitis/images/train.png';

import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <div className="card-container">
                <Card className="card">
                    <Card.Img src={bike} />
                    <Link className="btn btn-warning" to="/destination">BIKE</Link>
                </Card>
                <Card className="card">
                    <Card.Img src={car}/>
                    <Link className="btn btn-warning" to="/destination">CAR</Link>
                </Card>
                <Card className="card">
                    <Card.Img src={bus}/>
                    <Link className="btn btn-warning" to="/destination">BUS</Link>
                </Card>
                <Card className="card">
                    <Card.Img src={train}/>
                    <Link className="btn btn-warning" to="/destination">TRAIN</Link>
                </Card>
            </div>
        </div>
    );
};

export default Home;