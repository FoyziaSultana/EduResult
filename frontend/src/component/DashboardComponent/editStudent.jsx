
import "./studentManagement.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";


function EditStudent() {

    const navigate = useNavigate();
    const { id } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;

    const [studentInfo, setStudentInfo] = useState({
        studentId: "",
        studentName: "",
        email: "",
        phone: "",
        department: "",
        session: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(true);


    const getStudent = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/student/view`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {

                const student = data.students.find(
                    (student) => student._id === id
                );

                if (!student) {
                    handleError("Student not found!");
                    navigate("/dashboard/students");
                    return;
                }

                setStudentInfo({
                    studentId: student.studentId,
                    studentName: student.studentName,
                    email: student.email,
                    phone: student.phone,
                    department: student.department?._id || "",
                    session: student.session,
                    status: student.status
                });

            }
            else {
                handleError(data.message);
            }

        }
        catch (error) {
            handleError("Failed to load student information");
        }
        finally {
            setLoading(false);
        }

    };


    useEffect(() => {
        getStudent();
    }, [id]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setStudentInfo({
            ...studentInfo,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/student/update/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(studentInfo)

            });

            const data = await response.json();

            if (data.success) {

                handleSuccess(data.message);

                setTimeout(() => {
                    navigate("/dashboard/students");
                }, 1000);

            }
            else {
                handleError(data.message);
            }

        }
        catch (error) {
            handleError("Failed to update student");
        }

    };


    if (loading) {
        return <div className="student-container">Loading student information...</div>;
    }


    return (

        <div className="student-container">

            <ToastContainer />

            <div className="student-header">

                <div>
                    <h2>Edit Student</h2>
                </div>

            </div>


            <div className="student-card">

                <form onSubmit={handleSubmit}>

                    <div className="student-form-grid">

                        <div className="student-input">
                            <label>Student ID</label>
                            <input type="text" name="studentId" placeholder="Enter student ID"
                                value={studentInfo.studentId} onChange={handleChange} required
                            />
                        </div>

                        <div className="student-input">
                            <label>Student Name</label>
                            <input type="text" name="studentName" placeholder="Enter student name"
                                value={studentInfo.studentName} onChange={handleChange} required
                            />
                        </div>

                        <div className="student-input">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="Enter email address"
                                value={studentInfo.email} onChange={handleChange} required
                            />
                        </div>

                        <div className="student-input">
                            <label>Phone</label>
                            <input type="tel" name="phone" placeholder="Enter phone number"
                                value={studentInfo.phone} onChange={handleChange} required
                            />
                        </div>

                        <div className="student-input">
                            <label>Department</label>
                            <input type="text"
                                value={studentInfo.department ? "Department cannot be changed" : ""}
                                disabled
                            />
                        </div>

                        <div className="student-input">
                            <label>Session</label>
                            <input type="text" name="session" placeholder="Example: 2026-2027"
                                value={studentInfo.session} onChange={handleChange} required
                            />
                        </div>

                        <div className="student-input">
                            <label>Status</label>
                            <select name="status" value={studentInfo.status} onChange={handleChange} >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                    </div>


                    <div className="student-form-actions">

                        <button type="submit" className="student-submit-btn">
                            Update Student
                        </button>

                        <button type="button" className="student-cancel-btn"
                            onClick={() => navigate("/dashboard/students")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditStudent;
