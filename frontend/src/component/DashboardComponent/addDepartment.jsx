
import "./departmentManagement.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function AddDepartment() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);

    const [departmentInfo, setDepartmentInfo] = useState({
        departmentName: "",
        departmentCode: "",
        status: "Active"
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_API_URL}/userPermission/permissions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {
                    setPermissions(data.permissions);
                }

            })
            .catch(error => console.log("Permission Error:", error));

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setDepartmentInfo({
            ...departmentInfo,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { departmentName, departmentCode, status } = departmentInfo;

        if (departmentName.trim() === "" || departmentCode.trim() === "") {
            return handleError("Please fill in all information");
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/department/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        departmentName: departmentName.trim(),
                        departmentCode: departmentCode.trim().toUpperCase(),
                        status: status
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(
                    result.message || "Department added successfully!"
                );

                setTimeout(() => {
                    navigate("/dashboard/departments");
                }, 700);

            } else {

                handleError(
                    result.message || "Department creation failed!"
                );

            }

        } catch (error) {

            handleError(error.message);

        }

    };

    if (!permissions.includes("manage_departments")) {
        return null;
    }

    return (

        <div className="department-content dept-add">

            <div className="dept-form">

                <form onSubmit={handleSubmit}>

                    <h2>Add New Department</h2>

                    <div className="dept-grid">

                        <div className="dept-input">

                            <label>Department Name</label>

                            <input
                                type="text"
                                name="departmentName"
                                placeholder="Enter department name"
                                value={departmentInfo.departmentName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="dept-input">

                            <label>Department Code</label>

                            <input
                                type="text"
                                name="departmentCode"
                                placeholder="Enter department code (e.g. CSE)"
                                value={departmentInfo.departmentCode}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="dept-input">

                            <label>Status</label>

                            <select
                                name="status"
                                value={departmentInfo.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                        </div>

                    </div>

                    <div className="dept-actions">

                        <button type="submit" className="dept-add-btn">
                            Add Department
                        </button>

                        <button
                            type="button"
                            className="dept-cancel-btn"
                            onClick={() => navigate("/dashboard/departments")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

            <ToastContainer />

        </div>

    );

}

export default AddDepartment;
