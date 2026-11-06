
import "./DepartmentManagement.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddSemester() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

    const [semesterInfo, setSemesterInfo] = useState({
        department: "",
        year: "",
        term: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_API_URL}/department/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {
                    setDepartments(data.departments);
                } else {
                    handleError("Failed to load departments!");
                }

            })
            .catch(error => {
                handleError(error.message);
            });

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSemesterInfo({
            ...semesterInfo,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { department, year, term } = semesterInfo;

        if (!department || !year || !term) {
            return handleError("Please fillup all information!");
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/semester/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        department,
                        year: Number(year),
                        term: Number(term)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                handleSuccess(data.message);
                navigate("/dashboard/semesters");

            } else {

                handleError(data.message);

            }

        } catch (error) {

            handleError(error.message);

        }

    };

    return (

        <div className="department-content dept-add">

            <div className="dept-form">

                <h2>Add Semester</h2>

                <form onSubmit={handleSubmit}>

                    <div className="dept-grid">

                        <div className="dept-input">
                            <label>Department</label>

                            <select name="department" value={semesterInfo.department} onChange={handleChange} required >
                                <option value="">Select Department</option>

                                {departments.map(department => (
                                    <option key={department._id} value={department._id}>
                                        {department.departmentName}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div className="dept-input">
                            <label>Year</label>

                            <select name="year" value={semesterInfo.year} onChange={handleChange} required >
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>

                        <div className="dept-input">
                            <label>Term</label>

                            <select name="term" value={semesterInfo.term} onChange={handleChange} required >
                                <option value="">Select Term</option>
                                <option value="1">1st Term</option>
                                <option value="2">2nd Term</option>
                            </select>
                        </div>

                    </div>

                    <div className="dept-actions">

                        <button type="submit" className="dept-add-btn">
                            Add Semester
                        </button>

                        <button type="button" className="dept-cancel-btn" onClick={() => navigate("/dashboard/semesters")} >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default AddSemester;
