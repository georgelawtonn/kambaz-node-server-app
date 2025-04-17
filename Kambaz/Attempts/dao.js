import {v4 as uuidv4} from "uuid";
import model from "./model.js";

export const createAttempt = (attempt) => {
    const newAttempt = {
        ...attempt,
        _id: uuidv4(),
        attemptNumber: 1,
        score: attempt.score || 0
    };
    return model.create(newAttempt);
};

export const findAttemptsByUserAndQuiz = (userId, quizId) => model.findOne({user: userId, quiz: quizId});
export const updateAttempt = (attemptId, attempt) => model.updateOne({_id: attemptId}, {$set: attempt});


