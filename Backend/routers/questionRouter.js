import express from 'express';
import { adminVerification } from '../middleware/adminVerifyToken.js';
import { createQuestion, moveQuestion } from '../controller/questionController.js';

const Router = express.Router();

Router.post('/create', adminVerification, createQuestion);
Router.patch('/move/:id', adminVerification, moveQuestion);


export default Router;