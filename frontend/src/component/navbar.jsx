import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
function Navbar() {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            setLoggedIn(!!localStorage.getItem("token"));
        };
        checkLogin();
        window.addEventListener("login", checkLogin);

        return () => {
            window.removeEventListener("login", checkLogin);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setLoggedIn(false);
        navigate("/");
    };
    return (
        <header className="navbar">
            <div className="navbar-container">

                <div className="navbar-logo">
                    <div className="logo-icon">
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>

                    <span className="logo-text">EduResult</span>
                </div>




                <nav className="navbar-menu">
                    <a href="#home" >
                        Home
                    </a>

                    <a href="#features">
                        Features
                    </a>

                    <a href="#portal">
                        Portals
                    </a>

                </nav>


                <div className="navbar-actions">

                    {!loggedIn && ( <Link to="/login" className="login-btn">
                            Login
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        </Link>
                    )}
                    {loggedIn && ( <button onClick={handleLogout} className="login-btn">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;

