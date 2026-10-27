import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [permissions, setPermissions] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log("Navbar useEffect is running");

        const checkLogin = async () => {
            const token = localStorage.getItem("token");

            setLoggedIn(!!token);

            if (!token) {
                setPermissions([]);
                return;
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/userPermission/permissions`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                console.log("Permission API Status:", response.status);
                console.log("Permission API Response:", data);

                if (response.ok && data.success) {
                    setPermissions(data.permissions || []);
                } else {
                    setPermissions([]);
                }
            } catch (error) {
                console.error("Permission API Error:", error);
            }
        };

        checkLogin();

        window.addEventListener("login", checkLogin);

        return () => {
            window.removeEventListener("login", checkLogin);
        };
    }, [location.pathname]);

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
                    <a href="/" >
                        Home
                    </a>

                    <a href="/features">
                        Features
                    </a>

                    <a href="/portal">
                        Portals
                    </a>
                    {loggedIn && permissions.includes("view_dashboard") && (
                        <Link to="/dashboard" className="dashboard-btn">
                            Dashboard
                        </Link>
                    )}

                </nav>


                <div className="navbar-actions">

                    {!loggedIn && (<Link to="/login" className="login-btn">
                        Login
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </Link>
                    )}
                    {loggedIn && (<button onClick={handleLogout} className="login-btn">
                        Logout
                    </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;

