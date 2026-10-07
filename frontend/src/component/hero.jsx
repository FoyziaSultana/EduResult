import { Link } from "react-router-dom";
import "./hero.css";
import HeroRight from "../../public/HeroRight.png"


function Hero() {
    return (
        <section className="hero-section" id="home">

            <div className="hero-container">

                {/*left side*/}
                <div className="hero-content">


                    


                    <h1 className="hero-title">
                        Welcome to EduResult {" "}
                        <span>Simplifying Academic Result.</span>
                    </h1>


                    <p className="hero-description">
                        EduResult brings students, teachers, courses and academic results
                        together in one modern platform — making the complete result
                        processing workflow faster and easier.
                    </p>


                    <div className="hero-buttons">

                        <Link to="/signup"
                            className="hero-primary-btn"
                        >
                            Access Your Result Portal
                        </Link>

                    </div>


                </div>


                {/*right side*/}

                <div className="image" id="img">
                <img src={HeroRight} alt="EduResult" />
                </div>

            </div>

        </section>
    );
}

export default Hero;

