
import {LayoutDashboard, Users, GraduationCap, BookOpen, Building2, CalendarDays, ClipboardList,FileCheck,
        FileText, ShieldCheck, KeyRound, LogOut } from "lucide-react";

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./sidebar.css";

function Sidebar() {

    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            navigate("/login");
            return;
        }

        fetch(
            `${import.meta.env.VITE_API_URL}/userPermission/permissions`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load permissions");
                }

                return response.json();
            })
            .then(data => {

                console.log("EduResult Permissions:", data);

                if (data.success) {
                    setPermissions(data.permissions);
                }

            })
            .catch(error => {
                console.log("Permission Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [navigate]);


    const hasPermission = (permissionName) => {
        return permissions.includes(permissionName);
    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    if (loading) {
        return (
            <aside className="dashboard-sidebar">
                <div className="sidebar-menu">
                    <p>Loading menu...</p>
                </div>
            </aside>
        );
    }


    return (

        <aside className="dashboard-sidebar">

            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <GraduationCap size={25} />
                </div>

                <span>EduResult</span>
            </div>


            <div className="sidebar-menu">

                <p className="menu-title">
                    MAIN MENU
                </p>


                {hasPermission("view_dashboard") && (
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <LayoutDashboard size={19} />
                        <span>Dashboard</span>
                    </NavLink>
                )}


                {hasPermission("view_results") && (
                    <NavLink
                        to="/dashboard/results"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <ClipboardList size={19} />
                        <span>Results</span>
                    </NavLink>
                )}


                {hasPermission("view_marksheet") && (
                    <NavLink
                        to="/dashboard/marksheet"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FileText size={19} />
                        <span>My Marksheet</span>
                    </NavLink>
                )}


                {hasPermission("enter_marks") && (
                    <NavLink
                        to="/dashboard/enter-marks"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FileCheck size={19} />
                        <span>Enter Marks</span>
                    </NavLink>
                )}


                <p className="menu-title management-title">
                    ACADEMIC MANAGEMENT
                </p>


                {hasPermission("manage_students") && (
                    <NavLink
                        to="/dashboard/students"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <Users size={19} />
                        <span>Students</span>
                    </NavLink>
                )}


                {hasPermission("manage_teachers") && (
                    <NavLink
                        to="/dashboard/teachers"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <GraduationCap size={19} />
                        <span>Teachers</span>
                    </NavLink>
                )}


                {hasPermission("manage_departments") && (
                    <NavLink
                        to="/dashboard/departments"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <Building2 size={19} />
                        <span>Departments</span>
                    </NavLink>
                )}


                {hasPermission("manage_courses") && (
                    <NavLink
                        to="/dashboard/courses"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <BookOpen size={19} />
                        <span>Courses</span>
                    </NavLink>
                )}


                {hasPermission("manage_semesters") && (
                    <NavLink
                        to="/dashboard/semesters"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <CalendarDays size={19} />
                        <span>Academic Semesters</span>
                    </NavLink>
                )}


                <p className="menu-title management-title">
                    ACCESS MANAGEMENT
                </p>


                {hasPermission("view_users") && (
                    <NavLink
                        to="/dashboard/users"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <Users size={19} />
                        <span>Users</span>
                    </NavLink>
                )}


                {hasPermission("view_roles") && (
                    <NavLink
                        to="/dashboard/roles"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <ShieldCheck size={19} />
                        <span>Roles</span>
                    </NavLink>
                )}


                {hasPermission("view_permissions") && (
                    <NavLink
                        to="/dashboard/permissions"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <KeyRound size={19} />
                        <span>Permissions</span>
                    </NavLink>
                )}

            </div>


            <div className="sidebar-bottom">
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <LogOut size={19} />
                    <span>Logout</span>
                </button>

            </div>

        </aside>

    );

}

export default Sidebar;
