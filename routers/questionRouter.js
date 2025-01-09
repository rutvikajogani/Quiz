import express from 'express';
import { adminVerifyToken } from '../middleware/adminVerifyToken.js';
import { createQuestion, moveQuestion } from '../controller/questionController.js';

const Router = express.Router();

Router.post('/create', adminVerifyToken, createQuestion);
Router.patch('/move/:id', adminVerifyToken, moveQuestion);


export default Router;