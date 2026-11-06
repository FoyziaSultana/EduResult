const SemesterModel = require("../models/semesterModel");
const DepartmentModel = require("../models/departmentModel");

const addSemester = async (req, res) => {
    try {
        const { department, year, term } = req.body;

        if (!department || !year || !term) {
            return res.status(400).json({
                success: false,
                message: "Please fillup all information!"
            });
        }

        if (!Number.isInteger(year) || !Number.isInteger(term) || year < 1 || year > 4 || term < 1 || term > 2) {
            return res.status(400).json({ success: false, message: "Invalid year or term!" });
        }

        const existingDepartment = await DepartmentModel.findById(department);

        if (!existingDepartment) {
            return res.status(404).json({ success: false, message: "Department not found!" });
        }

        const existingSemester = await SemesterModel.findOne({ department, year, term });

        if (existingSemester) {
            return res.status(400).json({ success: false, message: "This semester already exists in this department!" });
        }

        const newSemester = new SemesterModel({ department, year, term });

        await newSemester.save();

        return res.status(201).json({ success: true, message: "Semester added successfully!", semester: newSemester });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

const getAllSemesters = async (req, res) => {
    try {
        const semesters = await SemesterModel.find().populate("department", "departmentName departmentCode").sort({
        department: 1, year: 1, term: 1 
    });

        return res.status(200).json({ success: true, semesters });

    } catch (error) {
        console.log("Get All Semesters Error:", error);
        return res.status(500).json({ success: false, message: "Server error!" });
    }
};

const updateSemester = async (req, res) => {
    try {
        const { id } = req.params;
        const { department, year, term, status } = req.body;

        const existingSemester = await SemesterModel.findById(id);

        if (!existingSemester) {
            return res.status(404).json({ success: false, message: "Semester not found!" });
        }

        if (!department || !year || !term) {
            return res.status(400).json({ success: false, message: "Please fillup all information!" });
        }

        if (!Number.isInteger(year) || !Number.isInteger(term) || year < 1 || year > 4 || term < 1 || term > 2) {
            return res.status(400).json({ success: false, message: "Invalid year or term!" });
        }

        if (status && !["Active", "Inactive"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid semester status!" });
        }

        const existingDepartment = await DepartmentModel.findById(department);

        if (!existingDepartment) {
            return res.status(404).json({ success: false, message: "Department not found!" });
        }

        const duplicateSemester = await SemesterModel.findOne({
            _id: { $ne: id },
            department, year, term
        });

        if (duplicateSemester) {
            return res.status(400).json({ success: false, message: "This semester already exists in this department!" });
        }

        const updatedSemester = await SemesterModel.findByIdAndUpdate(
            id,
            {
                department, year, term, status
            },
            {
                returnDocument: 'after'
            }
        );

        return res.status(200).json({ success: true, message: "Semester updated successfully!", semester: updatedSemester });

    } catch (error) {

        return res.status(500).json({ success: false, message: "Server error!" });
    }
};

const deleteSemester = async (req, res) => {
    try {
        const { id } = req.params;

        const semester = await SemesterModel.findById(id);

        if (!semester) {
            return res.status(404).json({ success: false, message: "Semester not found!" });
        }

        await SemesterModel.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Semester deleted successfully!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error!" });
    }
};

module.exports = { addSemester, getAllSemesters, updateSemester, deleteSemester };