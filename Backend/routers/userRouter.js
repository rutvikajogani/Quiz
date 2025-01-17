import express from 'express';
import { createUser,loginUser ,banUnbanUser} from '../controller/userController.js';
import {adminVerification} from '../middleware/adminVerifyToken.js'

const Router = express.Router();

Router.post('/login',loginUser)

Router.post('/create',adminVerification, createUser);
Router.patch('/ban/:id',adminVerification,banUnbanUser)

export default Router;