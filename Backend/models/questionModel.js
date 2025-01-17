import mongoose from "mongoose";


const options = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
})

const QuestionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['MCQ', 'TEXT', 'MULTIPLE'],
        required: true
    },
    options: [options],
    time: {
        type: Number,
        required: true
    },
    point: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Question', QuestionSchema);