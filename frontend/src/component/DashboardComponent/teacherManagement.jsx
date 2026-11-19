
import "./teacherManagement.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";


function TeacherManagement() {

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    const getAllTeachers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/teacher/view`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setTeachers(data.teachers || []);
            }
            else {
                handleError(data.message);
            }

        }
        catch (error) {
            handleError("Failed to load teachers");
        }
        finally {
            setLoading(false);
        }

    };


    useEffect(() => {
        getAllTeachers();
    }, []);


    const deleteTeacher = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this teacher?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/teacher/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                handleSuccess(data.message);
                getAllTeachers();
            }
            else {
                handleError(data.message);
            }

        }
        catch (error) {
            handleError("Failed to delete teacher");
        }

    };


    const filteredTeachers = teachers.filter((teacher) => {

        const value = search.toLowerCase();

        return (
            teacher.teacherId?.toLowerCase().includes(value) ||
            teacher.teacherName?.toLowerCase().includes(value) ||
            teacher.email?.toLowerCase().includes(value) ||
            teacher.phone?.includes(value) ||
            teacher.department?.departmentName?.toLowerCase().includes(value) ||
            teacher.designation?.toLowerCase().includes(value)
        );

    });


    const groupedTeachers = filteredTeachers.reduce((groups, teacher) => {

        const departmentId = teacher.department?._id ;
        const departmentName = teacher.department?.departmentName;

        if (!groups[departmentId]) {
            groups[departmentId] = {
                name: departmentName,
                teachers: []
            };
        }

        groups[departmentId].teachers.push(teacher);

        return groups;

    }, {});


    return (

        <div className="teacher-container">

            <ToastContainer />

            <div className="teacher-header">

                <div>
                    <h2>Teacher Management</h2>
                </div>


            </div>


            <div className="teacher-top">
                <button className="teacher-add-btn" onClick={() => navigate("/dashboard/teachers/add")}>
                    + Add Teacher
                </button>
                <input type="text" className="teacher-search"
                    placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            { Object.keys(groupedTeachers).length === 0 ? (

                <div className="teacher-card">
                    <p>No teachers found.</p>
                </div>

            ) : (

                Object.entries(groupedTeachers).map(([departmentId, group]) => (

                    <div className="teacher-card" key={departmentId}>

                        <div className="teacher-top">
                            <h3>{group.name}</h3>
                            <p>Total: {group.teachers.length} Teachers</p>
                        </div>


                        <div className="teacher-table-container">

                            <table className="teacher-table">

                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Teacher ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Designation</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>


                                <tbody>

                                    {group.teachers.map((teacher, index) => (

                                        <tr key={teacher._id}>

                                            <td>{index + 1}</td>
                                            <td>{teacher.teacherId}</td>
                                            <td>{teacher.teacherName}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.phone}</td>
                                            <td>{teacher.designation}</td>

                                            <td>
                                                <span className={`teacher-status ${teacher.status === "Active" ? "status-on" : "status-off"}`}>
                                                    {teacher.status}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="teacher-actions">

                                                    <button className="teacher-edit-btn"
                                                        onClick={() => navigate(`/dashboard/teachers/edit/${teacher._id}`)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button className="teacher-delete-btn" onClick={() => deleteTeacher(teacher._id)}>
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

            )}

        </div>

    );

}

export default TeacherManagement;
