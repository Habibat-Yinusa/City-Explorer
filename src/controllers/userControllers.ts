import User from "../models/user";
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import runChat from "../services/chatbotService";
// import { cloudinary } from "../config/cloudinary.js"


import { Request, Response } from 'express';



//Signup
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("Please fill in all fields");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("This email already exists");
        }

        const hashedPassword = await hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).send({ message: "Account created successfully!" });

    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
};

// Login
const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Incorrect password!");
        }

        const token = jwt.sign({
            userId: user._id, email: user.email, username: user.username
        }, process.env.JWT_SECRET!, { expiresIn: "90d" });

        res.status(200).send({
            token, id: user.id
        });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
};
const chatbot = async (req: Request, res: Response) => {
    const message = req.body.message;
    const reply = await runChat(message);
    res.json(reply);

   
  }


export { createUser, loginUser, chatbot }
