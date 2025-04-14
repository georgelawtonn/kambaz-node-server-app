import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        _id: String,
        quiz: { type: String, ref: "QuizModel" },
        title: String,
        type: {
            type: String,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
            default: "MULTIPLE_CHOICE"
        },
        points: { type: Number, default: 1 },
        text: String,
        choices: [{
            id: String,
            text: String,
            isCorrect: Boolean
        }],
        correctAnswer: { type: Boolean, default: true },
        possibleAnswers: [String],
        caseSensitive: { type: Boolean, default: false }
    },
    { collection: "questions" }
);

export default questionSchema;