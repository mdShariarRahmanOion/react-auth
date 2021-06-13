import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import urban from '../Utilitis/images/Uber.png';
import './Header.css';

const Header = () => {
    return (
        <div className="container">
            <Navbar  variant="dark">
                <img style={{height:'30px'}} src={urban} alt=""/>
                <Nav className="ml-auto ">
                    <Link to="/home">Home</Link>
                    <Link to="/Destination">Destination</Link>
                    <Link to="/Blog">Blog</Link>
                    <Link to="/Contact">Contact</Link>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;