
import "./navbar.css";

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

                    <a href="#analytics">
                        Analytics
                    </a>

                    <a href="#notice">
                        Notices
                    </a>
                </nav>


                <div className="navbar-actions">

                    <a href="#quick-lookup" className="quick-result-btn">
                        Quick Result
                    </a>

                    <a href="#login" className="login-btn">
                        Portal Login
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </a>

                </div>

            </div>
        </header>
    );
}

export default Navbar;

