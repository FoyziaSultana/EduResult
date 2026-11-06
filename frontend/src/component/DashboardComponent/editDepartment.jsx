
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";

function EditDepartment() {
    const navigate = useNavigate();
    const { id } = useParams();

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
            .catch(error => {
                console.log("Permission Error:", error);
            });

        fetch(`${import.meta.env.VITE_API_URL}/department/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    const selectedDepartment = data.departments.find(
                        department => department._id === id
                    );

                    if (selectedDepartment) {
                        setDepartmentInfo(selectedDepartment);
                    } else {
                        handleError("Department not found!");
                    }

                } else {
                    handleError("Failed to load department information!");
                }
            })
            .catch(error => {
                handleError(error.message);
            });

    }, [id]);

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

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/department/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        departmentName,
                        departmentCode,
                        status
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                handleSuccess(data.message);
                navigate("/dashboard/departments");
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
                <h2>Edit Department</h2>

                <form onSubmit={handleSubmit}>

                    <div className="dept-grid">

                        <div className="dept-input">
                            <label>Department Name</label>
                            <input type="text" name="departmentName"
                                value={departmentInfo.departmentName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="dept-input">
                            <label>Department Code</label>
                            <input type="text" name="departmentCode"
                                value={departmentInfo.departmentCode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="dept-input">
                            <label>Status</label>
                            <select name="status" value={departmentInfo.status} onChange={handleChange} >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                    </div>

                    <div className="dept-actions">
                        <button type="submit" className="dept-add-btn">
                            Update Department
                        </button>

                        <button type="button" className="dept-cancel-btn" onClick={() => navigate("/dashboard/departments")}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>

            <ToastContainer />

        </div>
    );
}

export default EditDepartment;
