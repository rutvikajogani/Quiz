import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Maths', 'Science', 'Hindi'],
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    }
}, { versionKey: false });

export default mongoose.model('Quiz', quizSchema);
