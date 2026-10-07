
import "./navbar.css";
import { Link} from "react-router-dom";
function Navbar() {
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

                    <Link to="/login"
                            className="login-btn"
                        >
                            Login
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        </Link>

                </div>

            </div>
        </header>
    );
}

export default Navbar;

