import runChat from "../services/chatbotService2";
import { Request, Response } from "express";
import { messages } from "./userControllers";
import User from "../models/user";

//SEND AND GET REPLY FROM BOT
const chatbot = async (req: Request, res: Response) => {
  const { _id, message } = req.body;
  if (!_id) {
    const reply = await runChat(message);
    const formattedReply = await formatAIReply(reply);
    res.json(formattedReply);
    messages.push(formattedReply);
    console.log(messages);
  } else {
    const user = await User.findOne({ _id });
    const reply = await runChat(message);

    const formattedReply = await formatAIReply(reply);
    console.log(formattedReply);

    // push to database array fields
    user?.userMessages.push(message);
    user?.botReplies.push(formattedReply);

    res.json(user?.botReplies);

    //save to db
    await user?.save();
  }
};

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

// FORMATTING RESPONSE
  function formatAIReply(description: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Replace double asterisks with <strong> tags for bold text
        let formattedAnswer = description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
        // Replace newlines with <br> tags for line breaks
        formattedAnswer = formattedAnswer.replace(/\n/g, '<br>');
  
        // Wrap the entire description in a <div> tag with a class for styling
        resolve(`<div class="restaurant-description">${formattedAnswer}</div>`);
      } catch (error) {
        reject(error);
      }
    });
  }
  

export { chatbot, messagesArray, databaseReply }