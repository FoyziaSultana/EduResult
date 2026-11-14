import "./CourseManagement.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function EditCourse() {

    const navigate = useNavigate();
    const { id } = useParams();

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
        getData();
    }, [id]);

    const getData = async () => {
        try {
            const token = localStorage.getItem("token");

            const [departmentResponse, semesterResponse, courseResponse] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/department/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),

                fetch(`${import.meta.env.VITE_API_URL}/semester/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),

                fetch(`${import.meta.env.VITE_API_URL}/course/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            ]);

            const departmentData = await departmentResponse.json();
            const semesterData = await semesterResponse.json();
            const courseData = await courseResponse.json();

            if (departmentData.success && semesterData.success && courseData.success) {

                setDepartments(departmentData.departments || []);
                setSemesters(semesterData.semesters || []);

                const course = courseData.courses.find(
                    (item) => item._id === id
                );

                if (!course) {
                    handleError("Course not found!");
                    navigate("/dashboard/courses");
                    return;
                }

                setCourseInfo({
                    department: course.department?._id || course.department || "",
                    semester: course.semester?._id || course.semester || "",
                    courseCode: course.courseCode || "",
                    courseName: course.courseName || "",
                    credit: course.credit || "",
                    status: course.status || "Active"
                });

            } else {
                handleError(
                    departmentData.message ||
                    semesterData.message ||
                    courseData.message ||
                    "Failed to load course information!"
                );
            }

        } catch (error) {
            handleError("Failed to load course information!");
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/course/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
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
                <h2>Edit Course</h2>
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
                        <select name="semester" value={courseInfo.semester} onChange={handleChange} disabled={!courseInfo.department} required>
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
                        <input type="text" name="courseCode"
                            placeholder="Enter course code" value={courseInfo.courseCode}
                            onChange={handleChange} required
                        />
                    </div>

                    <div className="course-input">
                        <label>Course Name</label>
                        <input type="text" name="courseName"
                            placeholder="Enter course name" value={courseInfo.courseName}
                            onChange={handleChange} required
                        />
                    </div>

                    <div className="course-input">
                        <label>Credit</label>
                        <input type="number" name="credit"
                            placeholder="Enter course credit"
                            min="0.5" max="10" step="0.5"
                            value={courseInfo.credit} onChange={handleChange} required
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
                        Update Course
                    </button>

                    <button type="button" className="course-cancel-btn" onClick={() => navigate("/dashboard/courses")}>
                        Cancel
                    </button>

                </div>

            </form>

            <ToastContainer />

        </div>
    );
}

export default EditCourse;