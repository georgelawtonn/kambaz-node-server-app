import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: { type: String, ref: "CourseModel" },
        description: String,
        quiz_type: {
            type: String,
            enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
            default: "GRADED_QUIZ"
        },
        points: { type: Number, default: 0 },
        assignment_group: {
            type: String,
            enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
            default: "QUIZZES"
        },
        shuffle_answers: { type: Boolean, default: false },
        has_time_limit: { type: Boolean, default: true },
        time_limit: { type: Number, default: 20 },
        multiple_attempts: { type: Boolean, default: false },
        attempts_allowed: { type: Number, default: 1 },
        show_correct_answers: { type: Boolean, default: true },
        show_correct_answers_date: { type: Date },
        access_code: { type: String, default: "" },
        one_question_at_a_time: { type: Boolean, default: true },
        webcam_required: { type: Boolean, default: false },
        lock_questions_after_answering: { type: Boolean, default: false },
        available_from: Date,
        available_until: Date,
        due: Date,
        published: { type: Boolean, default: false },
        questions: [{ type: String, ref: "QuestionModel" }]
    },
    { collection: "quizzes" }
);

export default quizSchema;