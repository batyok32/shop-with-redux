import React from 'react';
import "./styles.scss";
import logo from "./../../assets/logo.jpeg"
import {Link} from 'react-router-dom'


function Header() {
    return (
        <header className='header'>
            <div className="header__wrap">
                <div className="header__logo">
                    <Link to='/'>
                        <img className='logo__icon' src={logo} alt="Logo"/>
                    </Link>
                    
                </div>
                <div className="header__info">
                    <ul className='header__ul'>
                        <li className='header__li'> 
                            <Link to='/registration'>
                                <h3>Login</h3>
                            </Link>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </header>
    )
}

export default Header
