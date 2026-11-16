
import "./studentManagement.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";


function AddStudent() {

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [departments, setDepartments] = useState([]);

    const [studentInfo, setStudentInfo] = useState({
        studentId: "",
        studentName: "",
        email: "",
        phone: "",
        department: "",
        session: ""
    });


    const getDepartments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/department/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setDepartments(data.departments || []);
            }
            else {
                handleError(data.message);
            }

        }
        catch (error) {
            handleError("Failed to load departments");
        }

    };


    useEffect(() => {
        getDepartments();
    }, []);


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

            const response = await fetch(`${API_URL}/student/add`, {

                method: "POST",

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
            handleError("Failed to add student");
        }

    };


    return (

        <div className="student-container">

            <ToastContainer />

            <div className="student-header">

                <div>
                    <h2>Add Student</h2>
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

                            <input
                                type="text" name="studentName" placeholder="Enter student name"
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

                            <select name="department" value={studentInfo.department} onChange={handleChange} required >

                                <option value="">Select Department</option>

                                {departments.filter((department) => department.status === "Active")
                                    .map((department) => (

                                        <option key={department._id} value={department._id}>
                                            {department.departmentName} ({department.departmentCode})
                                        </option>

                                    ))}

                            </select>

                        </div>


                        <div className="student-input">

                            <label>Session</label>

                            <input type="text" name="session" placeholder="Example: 2026-2027"
                                value={studentInfo.session} onChange={handleChange} required
                            />

                        </div>


                    </div>


                    <div className="student-form-actions">

                        <button type="submit" className="student-submit-btn">
                            Add Student
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

export default AddStudent;
