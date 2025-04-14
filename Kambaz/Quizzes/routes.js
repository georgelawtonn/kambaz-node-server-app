import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    app.get("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        res.json(quiz);
    });

    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await dao.updateQuiz(quizId, quizUpdates);
        res.json(status);
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.json(status);
    });

    app.put("/api/quizzes/:quizId/publish", async (req, res) => {
        const { quizId } = req.params;
        const { publishState } = req.body;
        const status = await dao.publishQuiz(quizId, publishState);
        res.json(status);
    });

    // Question routes
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const questionData = {
            ...req.body,
            quiz: quizId
        };
        const question = await dao.createQuestion(questionData);
        res.json(question);
    });

    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsForQuiz(quizId);
        res.json(questions);
    });

    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        const status = await dao.updateQuestion(questionId, questionUpdates);
        res.json(status);
    });

    app.delete("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.deleteQuestion(questionId);
        res.json(status);
    });
}