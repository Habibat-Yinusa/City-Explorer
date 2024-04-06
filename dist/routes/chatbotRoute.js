"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Request, Response } from "express";
// import runChat from "../services/chatbotService"
const express_1 = require("express");
const chatbot_1 = require("../controllers/chatbot");
// import { botware } from "../middlewares/botMiddleware";
const router = (0, express_1.Router)();
router.post("/chatbot", chatbot_1.chatbot);
exports.default = router;
