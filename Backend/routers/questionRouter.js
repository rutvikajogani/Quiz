import express from 'express';
import { adminVerification } from '../middleware/adminVerifyToken.js';
import { createQuestion, moveQuestion,listQuestions,deleteQuestion ,updateQuestion} from '../controller/questionController.js';

const Router = express.Router();

Router.get('/list', listQuestions);

Router.post('/create', adminVerification, createQuestion);
Router.patch('/move/:id', adminVerification, moveQuestion);
Router.delete('/Delete/:id', adminVerification, deleteQuestion);
Router.put('/update/:id', adminVerification, updateQuestion);



export default Router;