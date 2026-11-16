
import "./studentManagement.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function StudentManagement() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    const getAllStudents = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/student/view`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                setStudents(result.students || []);
            }
            else {
                handleError(result.message);
            }

        }
        catch (error) {
            handleError("Failed to load students!");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllStudents();
    }, []);

    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this student?");

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/student/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                handleSuccess(result.message);
                getAllStudents();
            }
            else {
                handleError(result.message);
            }

        }
        catch (error) {
            handleError("Failed to delete student");
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

        const departmentId = student.department?._id ;
        const departmentName = student.department?.departmentName ;

        if (!groups[departmentId]) {
            groups[departmentId] = {
                name: departmentName,
                students: []
            };
        }

        groups[departmentId].students.push(student);

        return groups;

    }, {});


    return (

        <div className="student-container">

            <ToastContainer />

            <div className="student-header">

                <div>
                    <h2>Student Management</h2>
                </div>

                <button className="student-add-btn" onClick={() => navigate("/dashboard/students/add")} >
                    + Add Student
                </button>

            </div>


            <div className="student-top">

                <input type="text" className="student-search" placeholder="Search student..." value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            { Object.entries(groupedStudents).length > 0 ? (

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
                                        <th>Action</th>
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

                                            <td>

                                                <div className="student-actions">

                                                    <button
                                                        className="student-edit-btn"
                                                        onClick={() => navigate(`/dashboard/students/edit/${student._id}`)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="student-delete-btn"
                                                        onClick={() => deleteStudent(student._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                ))

            ) : (

                <div className="student-card">
                    <p>No students found</p>
                </div>

            )}


        </div>
    );
}

export default StudentManagement;
