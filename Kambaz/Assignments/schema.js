import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: { type: String, ref: "CourseModel" },
        description: String,
        available_from: Date,
        available_until: Date,
        due: Date,
        pts: Number
    },
    { collection: "assignments" }
);

export default assignmentSchema;