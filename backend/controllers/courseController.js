const CourseModel = require("../models/courseModel");
const DepartmentModel = require("../models/departmentModel");
const SemesterModel = require("../models/semesterModel");

const addCourse = async (req, res) => {
    try {
        const { department, semester, courseCode, courseName, credit } = req.body;
        if (!department || !semester || !courseCode || !courseName || !credit) {
            return res.status(400).json({
                succes: false,
                message: "Please fillup all information."
            });
        }

        if (!Number.isFinite(Number(credit)) || credit < 0.5) {
            return res.status(400).json({
                success: false,
                message: "Invalid course credit."
            });
        }

        const existingDepartment = await DepartmentModel.findById(department);

        if (!existingDepartment) {
            return res.status(404).json({
                success: false,
                message: "Department not found!"
            });
        }

        const existingSemester = await SemesterModel.findOne({
            _id: semester,
            department: department
        });

        if (!existingSemester) {
            return res.status(404).json({
                success: false,
                message: "Semester not found in this department!"
            });
        }

        const existingCourse = await CourseModel.findOne({
            department,
            courseCode: courseCode.trim().toUpperCase()
        });

        if (existingCourse) {
            return res.status(400).json({
                success: false,
                message: "This course code already exists in this department!"
            });
        }

        const newCourse = new CourseModel({
            department,
            semester,
            courseCode: courseCode.trim().toUpperCase(),
            courseName: courseName.trim(),
            credit: Number(credit)
        });

        await newCourse.save();

        return res.status(201).json({
            success: true,
            message: "Course added successfully!",
            course: newCourse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });

    }

};

getAllCourses = async(req, res) => {
    try
    {
        const courses = await CourseModel.find().populate("department", "departmentName departmentCode")
        .populate("semester", "year term").sort({courseCode: 1});
        return res.status(200).json({
            success: true, message: "Course added Successfully", courses
        });
    } catch(error)
    {
        return res.status(500).json({
            success:false, message: "Server error"
        });
    }
}

updateCourse = async (req, res) => {
    try{
        const {id} = req.params;
        const {department, semester, courseCode, courseName, credit, status} = req.body;
        const existingCourse = await CourseModel.find(id);
        if(!existingCourse)
        {
            return res.status(404).json({
                success:false, message: "Course not found"
            });
        }
        if(!department || !semester || !courseCode || !CourseName || !credit)
        {
            return res.status(400).json({
                success: false, message: "Please fillup all informations"
            });
        }
        if(!Number.isFinite(Number(credit)) || Number(credit) < 0.5 || Number(credit) > 10)
        {
            return res.status(400).json({
                success: false, message: "Invalid Course credit"
            });
        }
        if (status && !["Active", "Inactive"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid course status"
            });
    }
    const existingDepartment = await DepartmentModel.findById(department);

        if (!existingDepartment) {
            return res.status(404).json({ success: false, message: "Department not found!"
            });
        }

        const existingSemester = await SemesterModel.findOne({_id: semester, department: department});

        if (!existingSemester) {
            return res.status(404).json({ success: false, message: "Semester not found in this department!" });
        }

        const duplicateCourse = await CourseModel.findOne({_id: { $ne: id }, department, courseCode: courseCode.trim().toUpperCase() });

        if (duplicateCourse) {
            return res.status(400).json({ success: false, message: "This course code already exists in this department!" });
        }

        existingCourse.department = department;
        existingCourse.semester = semester;
        existingCourse.courseCode = courseCode.trim().toUpperCase();
        existingCourse.courseName = courseName.trim();
        existingCourse.credit = Number(credit);

        if (status) {
            existingCourse.status = status;
        }

        await existingCourse.save();

        return res.status(200).json({ success: true, message: "Course updated successfully!", course: existingCourse });


}catch (error) {

        return res.status(500).json({ success: false, message: "Server error!" });
    }
}

const deleteCourse = async (req, res) =>
{
    try{
        const {id} = req.params;

        const course = await CourseModel.findByIdAndDelete(id);
        
        if(!course)
        {
            return res.status(400).json({
                success: false, message: "Course not found"
            });
        }
        return res.status(200).json({
            success: true, message: "Course deleted Successfully"
        });
    } catch(error)
    {
        return res.status(500).json({
            seccess: false, message: "Server error"
        });
    }
}
module.exports = {addCourse, getAllCourses, updateCourse, deleteCourse};