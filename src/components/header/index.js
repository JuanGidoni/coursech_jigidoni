import React from 'react'
import logo from '../assets/logo.svg';
const Header = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Juan Ignacio Gidoni
            </p>
            <a
                className="App-link"
                href="https://coderhouse.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                CoderHouse
            </a>
        </header>
    )
}

export default Header
