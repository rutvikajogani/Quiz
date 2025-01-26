import express from 'express';
import { createUser,loginUser ,banUnbanUser,listUsers,deleteUser,updateUser } from '../controller/userController.js';
import {adminVerification} from '../middleware/adminVerifyToken.js'

const Router = express.Router();

Router.post('/login',loginUser)
Router.post('/create',adminVerification, createUser);
Router.patch('/ban/:id',adminVerification,banUnbanUser);
Router.get('/list', adminVerification, listUsers);
Router.delete('/Delete/:id',adminVerification, deleteUser);
Router.put('/update/:id', adminVerification, updateUser);




export default Router;