const TeacherModel = require("../models/teachersModel");
const DepartmentModel = require("../models/departmentModel");
const addTeacher = async (req, res) => {
    try {

        const teachers = Array.isArray(req.body) ? req.body : [req.body];

        if (teachers.length === 0) {
            return res.status(400).json({ success: false, message: "No teacher information found" });
        }

        const addedTeachers = [];

        for (const teacher of teachers) {

            const { teacherId, teacherName, email, phone, department, designation } = teacher;


            if (
                !teacherId || !teacherName || !email || !phone || !department || !designation ) {
                return res.status(400).json({ success: false, message: "Please fillup all informations" });
            }


            const existingTeacher = await TeacherModel.findOne({
                $or: [{ teacherId: teacherId.trim() }, { email: email.trim().toLowerCase() }]
            });

            if (existingTeacher) {
                return res.status(400).json({ success: false, message: "Teacher already exists" });
            }


            const existingDepartment = await DepartmentModel.findById(department);

            if (!existingDepartment || existingDepartment.status !== "Active") {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid department"
                });
            }


            const newTeacher = new TeacherModel({
                teacherId: teacherId.trim(),
                teacherName: teacherName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                department,
                designation: designation.trim()
            });


            await newTeacher.save();

            addedTeachers.push(newTeacher);
        }


        return res.status(201).json({
            success: true, message: "Teacher's information added successfully", teachers: addedTeachers
        });

    }
    catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: "Server error"});
    }
};


const getAllTeachers = async (req, res) => {
    try {

        const teachers = await TeacherModel.find().populate("department", "departmentName departmentCode");

        return res.status(200).json({ success: true, teachers });

    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateTeacher = async (req, res) => {
    try {

        const { id } = req.params;

        const { teacherId, teacherName, email, phone, department, designation, status } = req.body;

        if (!teacherId || !teacherName || !email || !phone || !department || !designation ) {
            return res.status(400).json({ success: false, message: "Please fillup all informations" });
        }

        const teacher = await TeacherModel.findById(id);

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        const duplicateTeacher = await TeacherModel.findOne({
            _id: { $ne: id },
            $or: [{ teacherId: teacherId.trim() }, { email: email.trim().toLowerCase() }]
        });

        if (duplicateTeacher) {
            return res.status(400).json({ success: false, message: "Teacher already exists"});
        }

        const existingDepartment = await DepartmentModel.findById(department);

        if (!existingDepartment || existingDepartment.status !== "Active") {
            return res.status(400).json({ success: false, message: "Department isn't currently available" });
        }

        if (status && !["Active", "Inactive"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid teacher status" });
        }

        teacher.teacherId = teacherId.trim();
        teacher.teacherName = teacherName.trim();
        teacher.email = email.trim().toLowerCase();
        teacher.phone = phone.trim();
        teacher.department = department;
        teacher.designation = designation.trim();

        if (status) {
            teacher.status = status;
        }

        await teacher.save();

        return res.status(200).json({ success: true, message: "Teacher updated successfully", teacher });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await TeacherModel.findById(id);

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found"
            });
        }
        await TeacherModel.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Teacher deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};



module.exports = {addTeacher, getAllTeachers, updateTeacher, deleteTeacher};