const DepartmentModel = require("../models/departmentModel");
const addDepartment = async (req, res) => {
    try {
        const { departmentName, departmentCode, status } = req.body;

        if (!departmentName || !departmentCode) {
            return res.status(400).json({success: false, message: "Please fillup all information."});
        }

        const existingDepartment = await DepartmentModel.findOne({
            $or: [
                { departmentName: departmentName.trim() },
                { departmentCode: departmentCode.trim().toUpperCase() }
            ]
        });

        if (existingDepartment) {
            return res.status(400).json({success: false, message: "Department already exists" });
        }

        const department = new DepartmentModel({departmentName, departmentCode, status});

        await department.save();

        return res.status(201).json({ success: true, message: "Department added successfully", department});

    } catch (error) {
        return res.status(400).json({ success: false, message: "Failed to add department", error: error.message });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await DepartmentModel.find();

        return res.status(200).json({success: true, departments});

    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to fetch departments", error: error.message});
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { departmentName, departmentCode, status } = req.body;

        if (!departmentName || !departmentCode) {
            return res.status(400).json({success: false, message: "Department name and code are required"});
        }

        if (status && !["Active", "Inactive"].includes(status)) {
            return res.status(400).json({success: false, message: "Invalid department status"});
        }

        const existingDepartment = await DepartmentModel.findOne({
            _id: { $ne: id },
            $or: [
                { departmentName: departmentName.trim() },
                { departmentCode: departmentCode.trim().toUpperCase() }
            ]
        });

        if (existingDepartment) {return res.status(409).json({ success: false, message: "Department already exists"
            });
        }

        const department = await DepartmentModel.findByIdAndUpdate(
            id,
            {
                departmentName: departmentName.trim(),
                departmentCode: departmentCode.trim().toUpperCase(),
                status
            },
            {
                returnDocument: 'after'
            }
        );

        if (!department) { return res.status(404).json({ success: false, message: "Department not found"});
        }

        return res.status(200).json({success: true, message: "Department updated successfully",department});

    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to update department", error: error.message});
    }
};

const deleteDepartment = async (req, res)=>{
    try{
        const { id } = req.params;

        const department = await DepartmentModel.findByIdAndDelete(id);

        if (!department) { return res.status(404).json({success: false, message: "Department not found"});
        }

        return res.status(201).json({success: true, message: "Department deleted successfully" });

    } catch (error){
        return res.status(500).json({ success: false, message: "Failed to delete department", error: error.message});
    }
};


module.exports = { addDepartment, getAllDepartments, updateDepartment, deleteDepartment };
