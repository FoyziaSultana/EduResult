
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../toastmsg";
import { ToastContainer } from "react-toastify";
import "./DepartmentManagement.css";

function EditSemester() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [departments, setDepartments] = useState([]);

    const [semesterInfo, setSemesterInfo] = useState({
        department: "",
        year: "",
        term: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        const getData = async () => {

            try {

                const [departmentResponse, semesterResponse] = await Promise.all([

                    fetch(`${import.meta.env.VITE_API_URL}/department/all`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),

                    fetch(`${import.meta.env.VITE_API_URL}/semester/all`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                ]);

                const departmentData = await departmentResponse.json();
                const semesterData = await semesterResponse.json();

                if (!departmentData.success) {
                    handleError(departmentData.message || "Failed to load departments!");
                    return;
                }

                if (!semesterData.success) {
                    handleError(semesterData.message || "Failed to load semesters!");
                    return;
                }

                setDepartments(departmentData.departments || []);

                const selectedSemester = semesterData.semesters.find(
                    semester => semester._id === id
                );

                if (!selectedSemester) {
                    handleError("Semester not found!");
                    return;
                }

                setSemesterInfo({
                    department: selectedSemester.department?._id || "",
                    year: String(selectedSemester.year),
                    term: String(selectedSemester.term)
                });

            } catch (error) {

                handleError(error.message);

            } finally {

                setLoading(false);

            }

        };

        getData();

    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSemesterInfo(prev => ({
            ...prev,
            [name]: value
        }));

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
                `${import.meta.env.VITE_API_URL}/semester/update/${id}`,
                {
                    method: "PUT",
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

    if (loading) {
        return <div className="department-content">Loading...</div>;
    }

    return (

        <div className="department-content dept-add">

            <div className="dept-form">

                <h2>Edit Semester</h2>

                <form onSubmit={handleSubmit}>

                    <div className="dept-grid">

                        <div className="dept-input">

                            <label>Department</label>

                            <select
                                name="department"
                                value={semesterInfo.department}
                                onChange={handleChange}
                                required
                            >

                                <option value="">Select Department</option>

                                {departments.map(department => (

                                    <option
                                        key={department._id}
                                        value={department._id}
                                    >
                                        {department.departmentName}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="dept-input">

                            <label>Year</label>

                            <select
                                name="year"
                                value={semesterInfo.year}
                                onChange={handleChange}
                                required
                            >

                                <option value="">Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>

                            </select>

                        </div>

                        <div className="dept-input">

                            <label>Term</label>

                            <select
                                name="term"
                                value={semesterInfo.term}
                                onChange={handleChange}
                                required
                            >

                                <option value="">Select Term</option>
                                <option value="1">1</option>
                                <option value="2">2</option>

                            </select>

                        </div>

                    </div>

                    <div className="dept-actions">

                        <button
                            type="submit"
                            className="dept-add-btn"
                        >
                            Update Semester
                        </button>

                        <button
                            type="button"
                            className="dept-cancel-btn"
                            onClick={() => navigate("/dashboard/semesters")}
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

export default EditSemester;
