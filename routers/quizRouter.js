import express from 'express';
import { adminVerification } from '../middleware/adminVerifyToken.js';
import { allQuizList, createQuiz, deleteQuiz, singleQuizList, updateQuiz } from '../controller/quizController.js';

const Router = express.Router();

Router.get('/list', allQuizList);
Router.get('/list/:id', singleQuizList);

Router.post('/create', adminVerification, createQuiz);

Router.put('/update/:id', adminVerification, updateQuiz);

Router.delete('/delete/:id',adminVerification, deleteQuiz );



export default Router;