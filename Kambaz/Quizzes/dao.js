import { v4 as uuidv4 } from "uuid";
import quizModel from "./model.js";
import questionModel from "../Questions/model.js"

export function createQuiz(quiz) {
    const newQuiz = {
        ...quiz,
        _id: uuidv4(),
        questions: []
    };
    return quizModel.create(newQuiz);
}

export function findQuizzesForCourse(courseId) {
    return quizModel.find({ course: courseId });
}

export function findQuizById(quizId) {
    return quizModel.findOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
    return quizModel.updateOne({ _id: quizId }, { $set: quizUpdates });
}

export function deleteQuiz(quizId) {
    questionModel.deleteMany({ quiz: quizId }).then(() => {
        return quizModel.deleteOne({ _id: quizId });
    });
}

export function publishQuiz(quizId, publishState) {
    return quizModel.updateOne(
        { _id: quizId },
        { $set: { published: publishState } }
    );
}

export function createQuestion(question) {
    const newQuestion = {
        ...question,
        _id: uuidv4()
    };

    return questionModel.create(newQuestion).then(createdQuestion => {
        return quizModel.updateOne(
            { _id: question.quiz },
            { $push: { questions: createdQuestion._id } }
        ).then(() => {
            return createdQuestion;
        });
    });
}

export function findQuestionsForQuiz(quizId) {
    return questionModel.find({ quiz: quizId });
}

export function updateQuestion(questionId, questionUpdates) {
    return questionModel.updateOne({ _id: questionId }, { $set: questionUpdates });
}

export function deleteQuestion(questionId) {
    return questionModel.findOne({ _id: questionId }).then(question => {
        if (!question) return null;

        return quizModel.updateOne(
            { _id: question.quiz },
            { $pull: { questions: questionId } }
        ).then(() => {
            return questionModel.deleteOne({ _id: questionId });
        });
    });
}

export async function syncQuizQuestions(quizId, questions) {
    try {
        const existingQuestions = await questionModel.find({ quiz: quizId });
        const existingIds = existingQuestions.map(q => q._id.toString());
        const newQuestionIds = questions.map(q => q._id);
        const questionIdsToDelete = existingIds.filter(_id => !newQuestionIds.includes(_id));
        const questionsToAdd = questions.filter(q => !existingIds.includes(q._id));
        const questionsToUpdate = questions.filter(q => existingIds.includes(q._id));

        if (questionIdsToDelete.length > 0) {
            await questionModel.deleteMany({ _id: { $in: questionIdsToDelete } });

            await quizModel.updateOne(
                { _id: quizId },
                { $pull: { questions: { $in: questionIdsToDelete } } }
            );
        }

        if (questionsToAdd.length > 0) {
            const addedQuestions = await questionModel.insertMany(
                questionsToAdd.map(q => ({ ...q, quiz: quizId, isDraft: false }))
            );
            const addedIds = addedQuestions.map(q => q._id);
            await quizModel.updateOne(
                { _id: quizId },
                { $push: { questions: { $each: addedIds } } }
            );
        }

        for (const question of questionsToUpdate) {
            await questionModel.updateOne(
                { _id: question._id },
                { $set: { ...question, isDraft: false } }
            );
        }

        const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0);
        await quizModel.updateOne(
            { _id: quizId },
            { $set: { points: totalPoints } }
        );

        return await questionModel.find({ quiz: quizId });

    } catch (error) {
        console.error("Error syncing quiz questions:", error);
        throw error;
    }
}