const StudentModel = require("../models/studentModel");
const DepartmentModel = require("../models/departmentModel");
const SemesterModel = require("../models/semesterModel");

const addStudent = async (req, res) => {
    try {
        const students = Array.isArray(req.body) ? req.body : [req.body];

        if (students.length === 0) {
            return res.status(400).json({ success: false, message: "No student information found" });
        }

        const addedStudents = [];

        for (const student of students) {

            const { studentId, studentName, email, phone, department, session } = student;

            if (!studentId || !studentName || !email || !phone || !department || !session) {
                return res.status(400).json({ success: false, message: "Please fillup all informations." });
            }

            const existingStudent = await StudentModel.findOne({
                $or: [{ studentId: studentId.trim() }, { email: email.trim().toLowerCase() }]
            });

            if (existingStudent) {
                return res.status(400).json({ success: false, message: "Student already exists." });
            }

            const existingDepartment = await DepartmentModel.findById(department);

            if (!existingDepartment) {
                return res.status(404).json({ success: false, message: "Department not found." });
            }

            if (existingDepartment.status !== "Active") {
                return res.status(400).json({ success: false, message: "This department is inactive." });
            }

            const firstSemester = await SemesterModel.findOne({
                department,
                year: 1,
                term: 1
            });

            if (!firstSemester) {
                return res.status(404).json({
                    success: false,
                    message: "First semester (1-1) not found "
                });
            }

            const newStudent = new StudentModel({
                studentId: studentId,
                studentName: studentName,
                email: email.toLowerCase(),
                phone: phone,
                department,
                currentSemester: firstSemester._id,
                session: session
            });

            await newStudent.save();
            addedStudents.push(newStudent);
        }
        return res.status(201).json({ success: true, message: "Student added successfully!", student: addedStudents });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find()
            .populate("department", "departmentName departmentCode")
            .populate("currentSemester", "year term");

        return res.status(200).json({ success: true, students });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const { studentId, studentName, email, phone, department, session, status } = req.body;

        if (!studentId || !studentName || !email || !phone || !department || !session) {
            return res.status(400).json({ success: false, message: "Please fillup all informations" });
        }

        const student = await StudentModel.findById(id);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const duplicateStudent = await StudentModel.findOne({
            _id: { $ne: id },
            $or: [{ studentId: studentId.trim() }, { email: email.trim().toLowerCase() }]
        });

        if (duplicateStudent) {
            return res.status(400).json({ success: false, message: "Student already exists" });
        }

        const existingDepartment = await DepartmentModel.findById(department);

        if (!existingDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        student.studentId = studentId.trim();
        student.studentName = studentName.trim();
        student.email = email.trim().toLowerCase();
        student.phone = phone.trim();
        student.session = session.trim();

        if (status) {
            student.status = status;
        }

        await student.save();

        return res.status(200).json({ success: true, message: "Student updated successfully", student });

    } catch (error) {

        return res.status(500).json({ success: false, message: "Server error!" });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await StudentModel.findById(id);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        await StudentModel.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Student deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { addStudent, getAllStudents, updateStudent, deleteStudent };