import runChat from "../services/chatbotService2";
import { Request, Response } from "express";
import { messages } from "./userControllers";
import User from "../models/user";
import type { Content } from "@google/generative-ai";



//SEND AND GET REPLY FROM BOT

const chatbot = async (req: Request, res: Response) => {
  const { _id, message } = req.body;
  const user = await User.findById(_id);

  const userMessages = user?.userMessages;
  const botReplies = user?.botReplies;
  let history = <Content[]>[];

  for (let i = 0; i < userMessages!.length; i++) {
    if (userMessages && botReplies) {
      const newHistory = <Content[]>[
        {
          role: "user",
          parts: [
            {
              text: userMessages[i] || "",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: botReplies[i] || "",
            },
          ],
        },
      ];

      // console.log(newHistory);
      history = <Content[]>[...history, ...newHistory];
    }
  }

  if (!_id) {
    const reply = await runChat(message, history);
    res.json(reply);
    messages.push(reply);
    console.log(messages, "unregistered");
  } else {
    const user = await User.findOne({ _id });
    const reply = await runChat(message, history);
    user?.userMessages.push(message);
    user?.botReplies.push(reply);
    await user?.save();
    res.json(reply.split("*").join(""));
  }
};

//GET ALL BOT REPLIES FOR AN UNREGISTERED USER
const messagesArray = async (req: Request, res: Response) => {
  try {
    res.status(200).send(messages);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

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
};

export { chatbot, messagesArray, databaseReply };