const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    departmentCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, {
    timestamps: true
});

const DepartmentModel = mongoose.model("Department", departmentSchema);

module.exports = DepartmentModel;