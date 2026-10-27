
import { Users, GraduationCap, BookOpen, FileCheck, TrendingUp } from "lucide-react";

import "./dashboardMainContent.css";

function DashboardMainContent() {

    return (
        <main className="dashboard-content">

            <div className="welcome-section">
                <h1>Welcome to EduResult</h1>

                <p>
                    Manage students, courses, and academic results
                    from one place.
                </p>
            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-info">
                        <p>Total Students</p>
                        <h2>250</h2>
                        <span>Registered students</span>
                    </div>

                    <div className="stat-icon student-icon">
                        <Users size={25} />
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-info">
                        <p>Total Teachers</p>
                        <h2>18</h2>
                        <span>Registered teachers</span>
                    </div>

                    <div className="stat-icon teacher-icon">
                        <GraduationCap size={25} />
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-info">
                        <p>Total Courses</p>
                        <h2>32</h2>
                        <span>Available academic courses</span>
                    </div>

                    <div className="stat-icon course-icon">
                        <BookOpen size={25} />
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-info">
                        <p>Published Results</p>
                        <h2>24</h2>
                        <span>Results published</span>
                    </div>

                    <div className="stat-icon result-icon">
                        <FileCheck size={25} />
                    </div>

                </div>

            </div>

            <div className="resource-card">

                <div className="overview-heading">
                    <div>
                        <h2>Academic Overview</h2>

                        <p>
                            Overview of academic result processing
                        </p>
                    </div>

                    <TrendingUp size={26} />
                </div>


                <div className="overview-grid">

                    <div className="overview-item">
                        <span>Academic Years</span>
                        <h3>4 Years</h3>
                        <p>Undergraduate program</p>
                    </div>

                    <div className="overview-item">
                        <span>Total Semesters</span>
                        <h3>8 Semesters</h3>
                        <p>6 months per semester</p>
                    </div>

                    <div className="overview-item">
                        <span>Result Processing</span>
                        <h3>Automated</h3>
                        <p>GPA and CGPA calculation</p>
                    </div>

                </div>

            </div>

        </main>
    );
}

export default DashboardMainContent;
