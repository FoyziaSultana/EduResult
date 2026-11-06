
import "./DepartmentManagement.css";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SemesterManagement() {

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [semesters, setSemesters] = useState([]);
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

    const getSemesters = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/semester/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            console.log("Semester API Status:", response.status);
            console.log("Semester API Response:", result);

            if (result.success) {
                setSemesters(result.semesters);
            } else {
                handleError(result.message || "Failed to load semesters!");
            }

        } catch (error) {
            console.log("Semester Fetch Error:", error);
            handleError(error.message);
        }
    };

    useEffect(() => {

        getSemesters();
        getPermissions();

    }, []);

    const deleteSemester = async (semesterId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this semester?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/semester/delete/${semesterId}`,
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
                getSemesters();

            } else {

                handleError(result.message || "Semester delete failed!");

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
                    <h2>All Semesters</h2>
                </div>

                {hasPermission("add_semester") && (

                    <button
                        className="dept-add-btn"
                        onClick={() => navigate("/dashboard/semesters/add")}
                    >
                        + Add Semester
                    </button>

                )}

            </div>

            {hasPermission("view_semester") ||
                hasPermission("add_semester") ||
                hasPermission("update_semester") ||
                hasPermission("delete_semester") ? (

                <div className="dept-table-card">

                    <table className="department-table">

                        <thead>

                            <tr>
                                <th>SL</th>
                                <th>Department</th>
                                <th>Semester</th>
                                <th>Status</th>

                                {(hasPermission("update_semester") ||
                                    hasPermission("delete_semester")) && (
                                        <th>Action</th>
                                    )}

                            </tr>

                        </thead>

                        <tbody>

                            {semesters.length > 0 ? (

                                semesters.map((semester, index) => (

                                    <tr key={semester._id}>

                                        <td>{index + 1}</td>

                                        <td>
                                            {semester.department?.departmentName || "N/A"}
                                        </td>

                                        <td>
                                            {semester.year}-{semester.term}
                                        </td>

                                        <td>
                                            <span className={`department-status ${semester.status === "Active"
                                                    ? "status-active"
                                                    : "status-inactive"
                                                }`}>
                                                {semester.status}
                                            </span>
                                        </td>

                                        {(hasPermission("update_semester") ||
                                            hasPermission("delete_semester")) && (

                                                <td className="department-action-buttons">

                                                    {hasPermission("update_semester") && (

                                                        <button
                                                            className="department-edit-btn"
                                                            onClick={() =>
                                                                navigate(`/dashboard/semesters/edit/${semester._id}`)
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                    )}

                                                    {hasPermission("delete_semester") && (

                                                        <button
                                                            className="department-delete-btn"
                                                            onClick={() => deleteSemester(semester._id)}
                                                        >
                                                            Delete
                                                        </button>

                                                    )}

                                                </td>

                                            )}

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan={
                                        (hasPermission("update_semester") ||
                                            hasPermission("delete_semester")) ? 5 : 4
                                    }>
                                        No semester records found.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            ) : (

                <p>You do not have permission to view semesters.</p>

            )}

            <ToastContainer />

        </div>

    );

}

export default SemesterManagement;
