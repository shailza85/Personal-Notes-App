import React, { Component } from 'react'; // Import React
import { Link } from 'react-router-dom'; // Link from react-router-dom
import NavMenu from './NavMenu'; // NavMenu

 // Header Component
export class Header extends Component {
    static displayName = Header.name;

    render() {
        return (
            <>
                {/* header section */}
                <header className="headerNav">
                    <Link to="/"> {/* Redirect to SignIn Page when user Click on Logo */ }
                        <img className="logo" alt="SS&H" src={require('../media/logo.png')} /> 
                    </Link>
                    <NavMenu /> {/* NavMenu */}
                </header>
            </>
        );
    }

}
