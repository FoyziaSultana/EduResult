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

module.exports = {addCourse};