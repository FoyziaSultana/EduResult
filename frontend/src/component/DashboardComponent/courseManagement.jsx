
import "./StudentManagement.css";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from "../../toastmsg";

import { ToastContainer } from "react-toastify";


function StudentManagement() {


    const navigate = useNavigate();


    const [permissions, setPermissions] = useState([]);
    const [students, setStudents] = useState([]);
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


    const getStudents = async () => {


        try {

            const token = localStorage.getItem("token");

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/student/view`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            const data = await response.json();


            if (data.success) {

                setStudents(data.students || []);

            } else {

                handleError(data.message || "Failed to load students!");

            }


        } catch (error) {

            handleError(error.message);

        }


    };


    useEffect(() => {

        getPermissions();
        getStudents();

    }, []);


    const deleteStudent = async (id) => {


        const confirmDelete = window.confirm(

            "Are you sure you want to delete this student?"

        );


        if (!confirmDelete) return;


        try {

            const token = localStorage.getItem("token");

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/student/delete/${id}`,

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
                getStudents();

            } else {

                handleError(data.message);

            }


        } catch (error) {

            handleError(error.message);

        }


    };


    const filteredStudents = students.filter((student) => {


        const value = search.toLowerCase();


        return (

            student.studentId?.toLowerCase().includes(value) ||

            student.studentName?.toLowerCase().includes(value) ||

            student.email?.toLowerCase().includes(value) ||

            student.phone?.toLowerCase().includes(value) ||

            student.department?.departmentName?.toLowerCase().includes(value) ||

            `${student.currentSemester?.year || ""}-${student.currentSemester?.term || ""}`.includes(value) ||

            student.session?.toLowerCase().includes(value)

        );


    });


    const groupedStudents = filteredStudents.reduce((groups, student) => {


        const departmentId = student.department?._id || "unknown";

        const departmentName = student.department?.departmentName || "Unknown Department";


        if (!groups[departmentId]) {

            groups[departmentId] = {

                name: departmentName,

                students: []

            };

        }


        groups[departmentId].students.push(student);


        return groups;


    }, {});


    const showActions =

        hasPermission("update_student") ||

        hasPermission("delete_student");


    if (permissionLoading) {

        return <div className="student-container">Loading...</div>;

    }


    return (


        <div className="student-container">


            <div className="student-header">


                <div>

                    <h2>Student Management</h2>

                </div>


                {hasPermission("add_student") && (

                    <button

                        className="student-add-btn"

                        onClick={() => navigate("/dashboard/students/add")}

                    >

                        + Add Student

                    </button>

                )}


            </div>


            {(hasPermission("view_student") ||

                hasPermission("add_student") ||

                hasPermission("update_student") ||

                hasPermission("delete_student")) && (


                <>


                    <div className="student-top">

                        <h3>All Students</h3>


                        <input

                            type="text"

                            className="student-search"

                            placeholder="Search student..."

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                        />

                    </div>


                    {Object.entries(groupedStudents).length > 0 ? (


                        Object.entries(groupedStudents).map(([departmentId, group]) => (


                            <div className="student-card" key={departmentId}>


                                <div className="student-top">

                                    <div>

                                        <h3>{group.name} Department</h3>

                                        <p>{group.students.length} Students</p>

                                    </div>

                                </div>


                                <div className="student-table-container">


                                    <table className="student-table">


                                        <thead>

                                            <tr>

                                                <th>SL</th>

                                                <th>Student ID</th>

                                                <th>Name</th>

                                                <th>Email</th>

                                                <th>Phone</th>

                                                <th>Semester</th>

                                                <th>Session</th>

                                                <th>Status</th>

                                                {showActions && <th>Action</th>}

                                            </tr>

                                        </thead>


                                        <tbody>


                                            {group.students.map((student, index) => (


                                                <tr key={student._id}>


                                                    <td>{index + 1}</td>

                                                    <td>{student.studentId}</td>

                                                    <td>{student.studentName}</td>

                                                    <td>{student.email}</td>

                                                    <td>{student.phone}</td>


                                                    <td>

                                                        {student.currentSemester

                                                            ? `${student.currentSemester.year}-${student.currentSemester.term}`

                                                            : "N/A"}

                                                    </td>


                                                    <td>{student.session}</td>


                                                    <td>

                                                        <span className={`student-status ${

                                                            student.status === "Active" ? "status-on" : "status-off"

                                                        }`}>

                                                            {student.status}

                                                        </span>

                                                    </td>


                                                    {showActions && (

                                                        <td>

                                                            <div className="student-actions">


                                                                {hasPermission("update_student") && (

                                                                    <button

                                                                        className="student-edit-btn"

                                                                        onClick={() => navigate(

                                                                            `/dashboard/students/edit/${student._id}`

                                                                        )}

                                                                    >

                                                                        Edit

                                                                    </button>

                                                                )}


                                                                {hasPermission("delete_student") && (

                                                                    <button

                                                                        className="student-delete-btn"

                                                                        onClick={() => deleteStudent(student._id)}

                                                                    >

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


                        <div className="student-card">

                            <p>No students found!</p>

                        </div>


                    )}


                </>


            )}


            <ToastContainer />


        </div>


    );

}


export default StudentManagement;
