import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All filed required",
                status: false,
                data: null
            })
        }

        const user = await userModel.findOne({ email: email.toLowerCase() })

        if (user) {
            return res.status(200).json({
                message: "user already exits",
                status: false,
                data: null
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name,
            email: email.toLowerCase(),
            password: hashPassword,
            role
        })

        return res.status(201).json({
            message: "user created",
            status: true,
            data: newUser
        })

    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: false,
            data: null
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All filed required",
                status: false,
                data: null
            })
        }

        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                message: "Invalid credentials",
                status: false,
                data: null
            })
        }

        if (user.isBan) {
            return res.status(403).json({
                message: "Your account has been banned",
                status: false,
                data: null
            })
        }

        const hashPassword = user.password;

        const isMatch = await bcrypt.compare(password, hashPassword); // true|false

        if (!isMatch) {
            return res.status(404).json({
                message: "Invalid credentials",
                status: false,
                data: null
            })
        }

        const token = jwt.sign({
            name: user.name,
            role: user.role,
            email: user.email,
            isBan: user.isBan
        }, 'quiz', {
            expiresIn: '10h'
        });
        


        return res.status(200).json({
            message: "login successful",
            status: true,
            data: token
        })

    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: false,
            data: null
        })
    }
}

export const banUnbanUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { ban } = req.body;

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
                data: null
            })
        }

        user.isBan = ban;
        user.updatedAt = Date.now();

        await user.save();

        return res.json({
            message: "Ban/Unban is successfully",
            status: true,
            data: null
        })

    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: false,
            data: null
        })
    }
}