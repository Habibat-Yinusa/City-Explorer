import runChat from "../services/chatbotService";
import { Request, Response } from "express";

const chatbot = async (req: Request, res: Response) => {
    const message = req.body.message;
    const reply = await runChat(message);
    res.json(reply);

   
  }

export { chatbot }