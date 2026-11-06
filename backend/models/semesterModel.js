const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },

    term: {
        type: Number,
        required: true,
        min: 1,
        max: 2
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, {
    timestamps: true
});

semesterSchema.index(
    { department: 1, year: 1, term: 1 },
    { unique: true }
);

const SemesterModel = mongoose.model("Semester", semesterSchema);

module.exports = SemesterModel;