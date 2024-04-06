import express, { Request, Response } from "express";
import runChat from "../controllers/chatbot";
import { Router } from "express";


const router = Router();

router.post("/chatbot", async (req: Request, res, Response) => {
    const message = req.body.message;
    const reply = await runChat(message);
    res.json(reply);
  });
  export default router