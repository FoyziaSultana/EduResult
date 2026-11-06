
import "./DepartmentManagement.css";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DepartmentManagement() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [permissionLoading, setPermissionLoading] = useState(true);

    const getPermissions = () => {

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
            .catch(error => {
                console.log("Permission Error:", error);
            })
            .finally(() => {
                setPermissionLoading(false);
            });

    };

    const hasPermission = (permissionName) => {
        return permissions.includes(permissionName);
    };

    const getDepartments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/department/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                setDepartments(result.departments);
            } else {
                handleError("Failed to load departments!");
            }

        } catch (error) {

            handleError("Something went wrong!");

        }

    };

    useEffect(() => {

        getDepartments();
        getPermissions();

    }, []);

    const deleteDepartment = async (departmentId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/department/delete/${departmentId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            if (result.success) {

                handleSuccess(result.message);
                getDepartments();

            } else {

                handleError(result.message || "Department delete failed!");

            }

        } catch (error) {

            handleError(error.message);

        }

    };

    if (permissionLoading) {
        return null;
    }

    return (

        <div className="department-content dept-list">

            <div className="dept-header">

                <div>
                    <h2>All Departments</h2>
                </div>

                {hasPermission("manage_departments") && (

                    <button className="dept-add-btn" onClick={() => navigate("/dashboard/departments/add")} >
                        + Add Department
                    </button>

                )}

            </div>

            {hasPermission("view_departments") || hasPermission("manage_departments") ? (

                <div className="dept-table-card">

                    <table className="department-table">

                        <thead>

                            <tr>
                                <th>SL</th>
                                <th>Department Name</th>
                                <th>Department Code</th>
                                <th>Status</th>

                                {hasPermission("manage_departments") && (
                                    <th>Action</th>
                                )}

                            </tr>

                        </thead>

                        <tbody>

                            {departments.length > 0 ? (

                                departments.map((department, index) => (

                                    <tr key={department._id}>

                                        <td>{index + 1}</td>

                                        <td>{department.departmentName}</td>

                                        <td>{department.departmentCode}</td>

                                        <td>
                                            <span className={`department-status ${
                                                department.status === "Active"
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }`}>
                                                {department.status}
                                            </span>
                                        </td>

                                        {hasPermission("manage_departments") && (

                                            <td className="department-action-buttons">

                                                <button
                                                    className="department-edit-btn"
                                                    onClick={() =>
                                                        navigate(`/dashboard/departments/edit/${department._id}`)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="department-delete-btn"
                                                    onClick={() => deleteDepartment(department._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        )}

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan={hasPermission("manage_departments") ? 5 : 4}>
                                        No department records found.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            ) : (

                <p>You do not have permission to view departments.</p>

            )}

            <ToastContainer />

        </div>

    );

}

export default DepartmentManagement;
