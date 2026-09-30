
import "./footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">

                    <div className="footer-logo">
                        <div className="footer-logo-icon">
                            <i className="fa-solid fa-graduation-cap"></i> 
                        </div>

                        <span>EduResult</span>
                    </div>

                    <p className="footer-description">
                        Next-generation automated result management system
                        bringing speed, accuracy, and secure academic result
                        processing to modern educational institutions.
                    </p>

                </div>



                <div className="footer-column">

                    <h4>Portals</h4>

                    <ul>
                        <li>
                            <a href="#student-login">
                                Student Login
                            </a>
                        </li>

                        <li>
                            <a href="#faculty">
                                Faculty Grade Portal
                            </a>
                        </li>

                        <li>
                            <a href="#admin">
                                Controller Admin
                            </a>
                        </li>

                    </ul>

                </div>


                <div className="footer-column">

                    <h4>Resources</h4>

                    <ul>
                        <li>
                            <a href="#grading">
                                Grading Scale Policy
                            </a>
                        </li>

                        <li>
                            <a href="#cgpa">
                                CGPA Calculation Rules
                            </a>
                        </li>

                        <li>
                            <a href="#transcript">
                                Transcript Application
                            </a>
                        </li>

                    </ul>

                </div>



                <div className="footer-column">

                    <h4>Help & Legal</h4>

                    <ul>
                        <li>
                            <a href="#status">
                                System Status
                            </a>
                        </li>

                        <li>
                            <a href="#privacy">
                                Privacy Policy
                            </a>
                        </li>

                        <li>
                            <a href="#terms">
                                Terms of Service
                            </a>
                        </li>

                    </ul>

                </div>

            </div>




            <div className="footer-bottom">

                <div className="footer-bottom-container">

                    <p>
                        © 2026 EduResult Management System.
                        All rights reserved.
                    </p>


                </div>

            </div>

        </footer>
    );
}

export default Footer;

