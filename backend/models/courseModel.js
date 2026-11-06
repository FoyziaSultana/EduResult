const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    },

    courseCode: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },

    courseName: {
        type: String,
        required: true,
        trim: true
    },

    credit: {
        type: Number,
        required: true,
        min: 0.5,
        max: 10
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

}, {
    timestamps: true
});

courseSchema.index(
    { department: 1, courseCode: 1 },
    { unique: true }
);

const CourseModel = mongoose.model("courses", courseSchema);

module.exports = CourseModel;
