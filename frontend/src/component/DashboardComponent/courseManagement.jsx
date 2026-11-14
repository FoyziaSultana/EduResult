
import "./CourseManagement.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function CourseManagement() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [permissionLoading, setPermissionLoading] = useState(true);

    const hasPermission = (name) => {
        return permissions.includes(name);
    };

    const getPermissions = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/userPermission/permissions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setPermissions(data.permissions);
            }

        } catch (error) {
            handleError(error.message);
        } finally {
            setPermissionLoading(false);
        }

    };

    const getCourses = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/course/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setCourses(data.courses || []);
            } else {
                handleError(data.message || "Failed to load courses!");
            }

        } catch (error) {
            handleError(error.message);
        }

    };

    useEffect(() => {
        getPermissions();
        getCourses();
    }, []);

    const deleteCourse = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/course/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                handleSuccess(data.message);
                getCourses();
            } else {
                handleError(data.message);
            }

        } catch (error) {
            handleError(error.message);
        }

    };

    const filteredCourses = courses.filter((course) => {

        const value = search.toLowerCase();

        return (
            course.courseCode?.toLowerCase().includes(value) ||
            course.courseName?.toLowerCase().includes(value) ||
            course.department?.departmentName?.toLowerCase().includes(value) ||
            `${course.semester?.year || ""}-${course.semester?.term || ""}`.includes(value)
        );

    });

    const groupedCourses = filteredCourses.reduce((groups, course) => {

        const departmentId = course.department?._id || "unknown";
        const departmentName = course.department?.departmentName || "Unknown Department";

        if (!groups[departmentId]) {
            groups[departmentId] = {
                name: departmentName,
                courses: []
            };
        }

        groups[departmentId].courses.push(course);

        return groups;

    }, {});

    const showActions =
        hasPermission("update_course") ||
        hasPermission("delete_course");

    if (permissionLoading) {
        return <div className="course-page">Loading...</div>;
    }

    return (

        <div className="course-page">

            <div className="course-head">

                <div>
                    <h2>Course Management</h2>
                </div>

                {hasPermission("add_course") && (
                    <button
                        className="course-add"
                        onClick={() => navigate("/dashboard/courses/add")}
                    >
                        + Add Course
                    </button>
                )}

            </div>

            {(hasPermission("view_courses") ||
                hasPermission("add_course") ||
                hasPermission("update_course") ||
                hasPermission("delete_course")) && (

                <>

                    <div className="course-top">
                        <h3>All Courses</h3>

                        <input
                            type="text"
                            className="course-search"
                            placeholder="Search course..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {Object.entries(groupedCourses).length > 0 ? (

                        Object.entries(groupedCourses).map(([departmentId, group]) => (

                            <div className="course-card" key={departmentId}>

                                <div className="course-top">
                                    <div>
                                        <h3>{group.name} Department</h3>
                                        <p>{group.courses.length} Courses</p>
                                    </div>
                                </div>

                                <div className="table-wrap">

                                    <table className="course-table">

                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Course Code</th>
                                                <th>Course Name</th>
                                                <th>Semester</th>
                                                <th>Credit</th>
                                                <th>Status</th>
                                                {showActions && <th>Action</th>}
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {group.courses.map((course, index) => (

                                                <tr key={course._id}>

                                                    <td>{index + 1}</td>
                                                    <td>{course.courseCode}</td>
                                                    <td>{course.courseName}</td>

                                                    <td>
                                                        {course.semester
                                                            ? `${course.semester.year}-${course.semester.term}`
                                                            : "N/A"}
                                                    </td>

                                                    <td>{course.credit}</td>

                                                    <td>
                                                        <span className={`course-status ${
                                                            course.status === "Active" ? "status-on" : "status-off"
                                                        }`}>
                                                            {course.status}
                                                        </span>
                                                    </td>

                                                    {showActions && (
                                                        <td>
                                                            <div className="actions">

                                                                {hasPermission("update_course") && (
                                                                    <button className="edit-btn" onClick={() => navigate(
                                                                            `/dashboard/courses/edit/${course._id}`
                                                                        )}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                )}

                                                                {hasPermission("delete_course") && (
                                                                    <button className="del-btn" onClick={() => deleteCourse(course._id)}>
                                                                        Delete
                                                                    </button>
                                                                )}

                                                            </div>
                                                        </td>
                                                    )}

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="course-card">
                            <p>No courses found!</p>
                        </div>

                    )}

                </>

            )}

            <ToastContainer />

        </div>

    );

}

export default CourseManagement;
