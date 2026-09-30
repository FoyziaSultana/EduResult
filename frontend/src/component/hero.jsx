
import "./hero.css";

function Hero() {
    return (
        <section className="hero-section" id="home">

            <div className="hero-container">

                {/*left side*/}
                <div className="hero-content">


                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        <span>EduResult Portal</span>
                    </div>


                    <h1 className="hero-title">
                        Manage university results {" "}
                        <span>smarter & faster.</span>
                    </h1>


                    <p className="hero-description">
                        EduResult brings students, teachers, courses and academic results
                        together in one modern platform — making the complete result
                        processing workflow faster and easier.
                    </p>


                    <div className="hero-buttons">

                        <a
                            href="#quick-lookup"
                            className="hero-primary-btn"
                        >
                            Check Student Result
                        </a>

                        <a
                            href="#demo"
                            className="hero-secondary-btn"
                        >
                            Request Institution Access
                        </a>

                    </div>


                    <div className="hero-stats">

                        <div className="hero-stat">
                            <h3>100%</h3>
                            <p>Automated CGPA</p>
                        </div>

                        <div className="hero-stat">
                            <h3>&lt; 0.5s</h3>
                            <p>Lookup Latency</p>
                        </div>


                    </div>

                </div>


                {/*right side*/}

                <div className="quick-result-card" id="quick-lookup">



                    <h2>
                        Quick Result Verification
                    </h2>

                    <p className="quick-result-description">
                        Enter student details to view or download marksheets.
                    </p>


                    <form
                        className="result-form"
                        onSubmit={(e) => e.preventDefault()}
                    >


                        <div className="form-group">

                            <label>
                                Academic Level
                            </label>

                            <select>
                                <option>
                                    Undergraduate (B.Sc / B.A)
                                </option>

                                <option>
                                    Postgraduate (M.Sc / M.A)
                                </option>

                            </select>

                        </div>


                        {/* provide std info */}
                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Student ID / Roll
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. 2026-46012"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Reg Number
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. 15409823"
                                />

                            </div>

                        </div>



                        <div className="form-group">

                            <label>
                                Semester / Exam Term
                            </label>

                            <select>

                                <option>
                                    Spring 2026 - Final Examination
                                </option>

                                <option>
                                    Fall 2025 - Final Examination
                                </option>

                                <option>
                                    Spring 2025 - Mid Term
                                </option>

                            </select>

                        </div>



                        <button
                            type="submit"
                            className="get-result-btn"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>

                            <span>
                                Get Official Marksheet
                            </span>
                        </button>

                    </form>

                </div>

            </div>

        </section>
    );
}

export default Hero;

