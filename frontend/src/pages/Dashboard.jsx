import { Outlet } from "react-router-dom";
import Sidebar from "../component/DashboardComponent/sidebar";
import DashboardContent from "../component/DashboardComponent/dashboardMainContent";
import "./Dashboard.css";


function Dashboard() {

    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Outlet />

            </div>

        </div>
    );
}

export default Dashboard;