
import "./teacherManagement.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddTeacher() {

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [departments, setDepartments] = useState([]);

    const [teacher, setTeacher] = useState({
        teacherId: "",
        teacherName: "",
        email: "",
        phone: "",
        department: "",
        designation: ""
    });

    useEffect(() => {
        getDepartments();
    }, []);

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

    const handleChange = (e) => {

        const { name, value } = e.target;

        setTeacher({
            ...teacher,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/teacher/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(teacher)
            });

            const data = await response.json();

            if (data.success) {

                handleSuccess(data.message);

                setTimeout(() => { navigate("/dashboard/teachers"); }, 1000);

            }
            else {
                handleError(data.message);
            }

        }
        catch (error) {
            handleError("Failed to add teacher");
        }

    };


    return (

        <div className="teacher-container">

            <ToastContainer />

            <div className="teacher-header">
                <div>
                    <h2>Add Teacher</h2>
                </div>
            </div>


            <div className="teacher-card">

                <form onSubmit={handleSubmit}>

                    <div className="teacher-form-grid">

                        <div>
                            <label>Teacher ID</label>
                            <input type="text" name="teacherId" className="teacher-input"
                                placeholder="Enter teacher ID"
                                value={teacher.teacherId} onChange={handleChange} required
                            />
                        </div>

                        <div>
                            <label>Teacher Name</label>
                            <input type="text" name="teacherName" className="teacher-input"
                                placeholder="Enter teacher name"
                                value={teacher.teacherName} onChange={handleChange} required
                            />
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="email" name="email" className="teacher-input"
                                placeholder="Enter email address"
                                value={teacher.email} onChange={handleChange} required
                            />
                        </div>

                        <div>
                            <label>Phone</label>
                            <input type="text" name="phone" className="teacher-input"
                                placeholder="Enter phone number"
                                value={teacher.phone} onChange={handleChange} required
                            />
                        </div>

                        <div>
                            <label>Department</label>
                            <select name="department" className="teacher-input"
                                value={teacher.department} onChange={handleChange} required
                            >
                                <option value="">Select Department</option>

                                {departments
                                    .filter((department) => department.status === "Active")
                                    .map((department) => (
                                        <option
                                            key={department._id}
                                            value={department._id}
                                        >
                                            {department.departmentName}
                                        </option>
                                    ))
                                }

                            </select>
                        </div>

                        <div>
                            <label>Designation</label>
                            <select name="designation" className="teacher-input"
                                value={teacher.designation} onChange={handleChange} required
                            >
                                <option value="">Select Designation</option>
                                <option value="Professor">Professor</option>
                                <option value="Associate Professor">Associate Professor</option>
                                <option value="Assistant Professor">Assistant Professor</option>
                                <option value="Lecturer">Lecturer</option>
                            </select>
                        </div>

                    </div>


                    <div className="teacher-form-actions">

                        <button type="button" className="teacher-cancel-btn"
                            onClick={() => navigate("/dashboard/teachers")}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="teacher-submit-btn">
                            Add Teacher
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddTeacher;
