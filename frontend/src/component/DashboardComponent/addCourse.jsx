import "./CourseManagement.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddCourse() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [semesters, setSemesters] = useState([]);

    const [courseInfo, setCourseInfo] = useState({
        department: "",
        semester: "",
        courseCode: "",
        courseName: "",
        credit: "",
        status: "Active"
    });

    useEffect(() => {
        getDepartments();
        getSemesters();
    }, []);

    const getDepartments = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/department/all`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setDepartments(data.departments);
            } else {
                handleError(data.message);
            }

        } catch (error) {
            handleError("Failed to load departments!");
        }
    };

    const getSemesters = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/semester/all`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setSemesters(data.semesters);
            } else {
                handleError(data.message);
            }

        } catch (error) {
            handleError("Failed to load semesters!");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCourseInfo({
            ...courseInfo,
            [name]: value
        });
    };

    const handleDepartmentChange = (e) => {
        setCourseInfo({
            ...courseInfo,
            department: e.target.value,
            semester: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { department, semester, courseCode, courseName, credit, status } = courseInfo;

        if (!department || !semester || !courseCode.trim() || !courseName.trim() || !credit) {
            return handleError("Please fillup all information!");
        }

        if (Number(credit) < 0.5 || Number(credit) > 10) {
            return handleError("Credit must be between 0.5 and 10");
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/course/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    department,
                    semester,
                    courseCode: courseCode.trim().toUpperCase(),
                    courseName: courseName.trim(),
                    credit: Number(credit),
                    status
                })
            });

            const data = await response.json();

            if (data.success) {
                handleSuccess(data.message);
                setTimeout(() => {
                    navigate("/dashboard/courses");
                }, 1000);
            } else {
                handleError(data.message);
            }

        } catch (error) {
            handleError("Something went wrong!");
        }
    };

    const filteredSemesters = semesters.filter((semester) => {
        const departmentId = semester.department?._id || semester.department;
        return departmentId === courseInfo.department;
    });

    return (
        <div className="course-page course-add-page">

            <div className="course-head">
                <h2>Add Course</h2>
            </div>

            <form className="course-form" onSubmit={handleSubmit}>

                <div className="course-grid">

                    <div className="course-input">
                        <label>Department</label>
                        <select name="department" value={courseInfo.department} onChange={handleDepartmentChange} required>
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                                <option key={department._id} value={department._id}>
                                    {department.departmentName} ({department.departmentCode})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="course-input">
                        <label>Semester</label>
                        <select name="semester" value={courseInfo.semester} onChange={handleChange} disabled={!courseInfo.department} required >
                            <option value="">Select Semester</option>
                            {filteredSemesters.map((semester) => (
                                <option key={semester._id} value={semester._id}>
                                    {semester.year}-{semester.term}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="course-input">
                        <label>Course Code</label>
                        <input type="text" name="courseCode" placeholder="Enter course code"
                            value={courseInfo.courseCode} onChange={handleChange} required
                        />
                    </div>

                    <div className="course-input">
                        <label>Course Name</label>
                        <input type="text" name="courseName" placeholder="Enter course name"
                            value={courseInfo.courseName} onChange={handleChange} required
                        />
                    </div>

                    <div className="course-input">
                        <label>Credit</label>
                        <input type="number" name="credit" placeholder="Enter course credit"
                            min="0.5" max="10" step="0.5" value={courseInfo.credit}
                            onChange={handleChange} required
                        />
                    </div>

                    <div className="course-input">
                        <label>Status</label>
                        <select name="status" value={courseInfo.status} onChange={handleChange} >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                </div>

                <div className="course-actions">
                    <button type="submit" className="course-add-btn">
                        Add Course
                    </button>

                    <button type="button" className="course-cancel-btn" onClick={() => navigate("/dashboard/courses")} >
                        Cancel
                    </button>
                </div>

            </form>

            <ToastContainer />

        </div>
    );
}

export default AddCourse;