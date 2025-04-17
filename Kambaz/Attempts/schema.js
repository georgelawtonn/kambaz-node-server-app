import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            ref: "UserModel",
            required: true
        },
        quiz: {
            type: String,
            ref: "QuizModel",
            required: true
        },
        attemptNumber: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            default: 0
        },
        answers: [
            {
                question: {
                    type: String,
                    ref: "QuestionModel",
                    required: true
                },

                selectedChoiceIndex: Number,
                trueFalseAnswer: Boolean,
                textAnswers: [String],

                isCorrect: Boolean,
                pointsEarned: Number
            }
        ]
    },
    {collection: "attempts"}
);

export default attemptSchema;