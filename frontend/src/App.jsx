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
import EditDepartment from "./component/DashboardComponent/editDepartment";
import SemesterManagement from "./component/DashboardComponent/semesterManagement";
import AddSemester from "./component/DashboardComponent/addSemester";
import EditSemester from "./component/DashboardComponent/editSemester";
import CourseManagement from "./component/DashboardComponent/courseManagement";
import AddCourse from "./component/DashboardComponent/addCourse";
import EditCourse from "./component/DashboardComponent/editCourse";
import StudentManagement from "./component/DashboardComponent/studentManagement";
import AddStudent from "./component/DashboardComponent/addStudent";
import EditStudent from "./component/DashboardComponent/editStudent";
import TeacherManagement from "./component/DashboardComponent/teacherManagement";
import AddTeacher from "./component/DashboardComponent/addTeacher";
import EditTeacher from "./component/DashboardComponent/editTeacher";

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
                                <Route path="departments/edit/:id" element={<EditDepartment />}/>
                                <Route path="semesters" element={<SemesterManagement />}/>
                                <Route path="semesters/add" element={<AddSemester />}/>
                                <Route path="semesters/edit/:id" element={<EditSemester />} />
                                <Route path="courses" element={<CourseManagement />}/>
                                <Route path="courses/add" element={<AddCourse />}/>
                                <Route path="courses/edit/:id" element={<EditCourse />} />
                                <Route path="students" element={<StudentManagement/> } />
                                <Route path="students/add" element={<AddStudent />} />
                                <Route path="students/edit/:id" element={<EditStudent />} />
                                <Route path="teachers" element={<TeacherManagement />} />
                                <Route path="teachers/add" element={<AddTeacher />} />
                                <Route path="teachers/edit/:id" element={<EditTeacher />} />
                                </Route>
                </Routes>
            </main>

            <Footer />

        </div>
    );
}

export default App;