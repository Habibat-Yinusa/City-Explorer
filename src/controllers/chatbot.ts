import runChat from "../services/chatbotService";
import { Request, Response } from "express";
import { messages } from "./userControllers";
import User from "../models/user";

//SEND AND GET REPLY FROM BOT
const chatbot = async (req: Request, res: Response) => {
    const { _id, message } = req.body;
    if (!_id) {
      const reply = await runChat(message);
      res.json(reply);
      messages.push(reply);
      console.log(messages, "unregistered"
      );
    } else {
    const user = await User.findOne({ _id });
    const reply = await runChat(message);
    user?.userMessages.push(message);
    user?.botReplies.push(reply);
      res.json(user?.botReplies)
    await user?.save();
    }
   
  }

  //GET ALL BOT REPLIES FOR AN UNREGISTERED USER
  const messagesArray = async (req: Request, res: Response) => {
    try {
      res.status(200).send(messages)
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //GET ALL BOT REPLIES FOR A REGISTERED USER
  const databaseReply = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id;
        const user = await User.findOne({ _id });
        if (user) {
            res.json(user.botReplies);
        }
    
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  } 

export { chatbot, messagesArray, databaseReply }