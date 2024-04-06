// import express, { Request, Response } from "express";
// import runChat from "../services/chatbotService"
import { Router } from "express";
import {chatbot} from "../controllers/chatbot";
// import { botware } from "../middlewares/botMiddleware";


const router = Router();

router.post("/chatbot", chatbot);
  
export default router