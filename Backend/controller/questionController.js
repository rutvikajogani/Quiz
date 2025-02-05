import questionModel from "../models/questionModel.js";
import quizModel from "../models/quizModel.js";

export const createQuestion = async (req, res) => {
    try {

        const { title, type, options, time, point, quizId } = req.body;

        if (quizId) {
            const quiz = await quizModel.findById(quizId);

            if (!quiz) {
                return res.status(404).json({
                    message: "Quiz not found..!"
                })
            }
        }

        if (!title || !type || !options || !time || !point) {
            return res.status(400).json({
                message: 'All fields are required',
                status: false,
                data: null
            })
        }
        const question = await questionModel.create(req.body);

        return res.status(201).json({
            message: "question Created",
            status: true,
            data: question
        })


    } catch (err) {
        console.error("Error in createQuestion:", err);
        return res.status(500).json({
            message: "Internal server error",
            status: true,
            data: question
        })
    }
}

export const moveQuestion = async (req, res) => {
    try {

        const { quizId } = req.body;
        const { id } = req.params;

        if (quizId) {
            const quiz = await quizModel.findById(quizId);

            if (!quiz) {
                return res.status(404).json({
                    message: "Quiz not found..!"
                })
            }

            const question = await questionModel.findByIdAndUpdate(id, { quizId, },
                { new: true });

            if (!question) {
                return res.status(404).json({
                    message: "Question not found..!"
                })
            }

            return res.status(201).json({
                message: "Question moved",
                status: true,
                data: question
            })
        }

        return res.status(400).json({
            message: "QuizId is required"
        })

    } catch (err) {

        return res.status(500).json({
            message: "Internal server error",
            status: true,
            data: question
        })
    }
}
export const listQuestions = async (req, res) => {
    try {
        // Fetch all questions, excluding any sensitive fields like 'answers' or 'userData'
        const questions = await questionModel.find()
    
        return res.status(200).json({
            message: 'Questions list retrieved successfully',
            status: true,
            data: questions
        });
    } catch (err) {
        console.error(err); // Log error for debugging purposes
        return res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await questionModel.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({
                message: 'Question not found..!',
                status: false,
                data: null
            })
        }
        return res.json({
            message: 'Question deleted',
            status: false,
            data: question
        })
        
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        })
    }
}

export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await questionModel.findById(id);
        if (!question) {
            return res.status(404).json({
                message: 'Question not found..!',
                status: false,
                data: null
            })
        }
        for (const key in req.body) {
            question[key] = req.body[key]
        }

        await question.save();

        return res.json({
            message: 'Question updated',
            status: true,
            data: question
        })
        
    } catch (err) {
        console.error(err); // Log error for debugging purposes
        return res.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }
}