import React from 'react';
import "./styles.scss";
import {connect} from "react-redux"
import logo from "./../../assets/logo.jpeg"
import {Link} from 'react-router-dom'
import { auth} from "./../../firebase/utils"


const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

function Header({currentUser}) {
    return (
        <header className='header'>
            <div className="header__wrap">
                <div className="header__logo">
                    <Link to='/'>
                        <img className='logo__icon' src={logo} alt="Logo"/>
                    </Link>
                    
                </div>
                <div className="header__info">
                    {currentUser &&  (
                        <ul>
                            <li>
                                <h3 onClick={() => auth.signOut()} className='header__info__text'>Logout</h3>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
                        <ul className='header__ul'>
                        <li className='header__li last'> 
                            <Link to='/registration'>
                                <h3 className='header__info__text'>Register</h3>
                            </Link>
                        </li>
                        <li className='header__li' > 
                            <Link to='/login'>
                                <h3 className='header__info__text'>Login</h3>
                            </Link>
                        </li>
                    </ul>
                    )}
                    
                    
                </div>
            </div>
        </header>
    )
}


export default connect(mapStateToProps, null)(Header)
