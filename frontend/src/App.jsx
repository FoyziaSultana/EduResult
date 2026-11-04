import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import ProtectedRoute from "./component/protectedRoute";
import Dashboard from "./pages/Dashboard";
import DashboardMainContent from "./component/DashboardComponent/dashboardMainContent";
import DepartmentManagement from "./component/DashboardComponent/departmentManagement";
import AddDepartment from "./component/DashboardComponent/addDepartment";

function App() {
    return (
        <div className="App">

            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}>
                                <Route index element={<DashboardMainContent />} />
                                <Route path="departments" element={<DepartmentManagement />}/>
                                <Route path="departments/add" element={<AddDepartment />}/>

                                </Route>
                </Routes>
            </main>

            <Footer />

        </div>
    );
}

export default App;