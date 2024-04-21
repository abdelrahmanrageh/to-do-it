import React, { useEffect, useState } from 'react';
import logo from './media/android-chrome-192x192.png';
function Navbar() {

    let initialDarkMode;
    try {
        initialDarkMode = JSON.parse(window.localStorage.darkMode);
    } catch (error) {
        initialDarkMode = true;
    }
    const [darkMode, setDarkMode] = useState( initialDarkMode);

    useEffect(() => { 
        window.localStorage.darkMode = darkMode;
        if (darkMode) {
            document.body.setAttribute('data-bs-theme', 'dark');
        } else {
            document.body.setAttribute('data-bs-theme', 'light');
        }
    }, [darkMode]);
    
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand" href="/#">
                    <img src={logo} alt="to-do-it logo" />
                    <span className="brand">To Do it</span>
                </a>
                <div className="form-check form-switch">
                    <label className="form-check-label" >Dark Mode</label>
                    <input
                        className="form-check-input dark-switch"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onClick={(e) => { setDarkMode(!darkMode); }}
                        defaultChecked={darkMode}
                    />
                </div>
            </div>
        </nav>
    );
}
export default Navbar;