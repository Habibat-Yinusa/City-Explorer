"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseReply = exports.messagesArray = exports.chatbot = void 0;
const chatbotService_1 = __importDefault(require("../services/chatbotService"));
const userControllers_1 = require("./userControllers");
const user_1 = __importDefault(require("../models/user"));
//SEND AND GET REPLY FROM BOT
const chatbot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, message } = req.body;
    if (!_id) {
        const reply = yield (0, chatbotService_1.default)(message);
        res.json(reply);
        userControllers_1.messages.push(reply);
        console.log(userControllers_1.messages, "unregistered");
    }
    else {
        const user = yield user_1.default.findOne({ _id });
        const reply = yield (0, chatbotService_1.default)(message);
        user === null || user === void 0 ? void 0 : user.userMessages.push(message);
        user === null || user === void 0 ? void 0 : user.botReplies.push(reply);
        res.json(user === null || user === void 0 ? void 0 : user.botReplies);
        yield (user === null || user === void 0 ? void 0 : user.save());
    }
});
exports.chatbot = chatbot;
//GET ALL BOT REPLIES FOR AN UNREGISTERED USER
const messagesArray = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send(userControllers_1.messages);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});
exports.messagesArray = messagesArray;
//GET ALL BOT REPLIES FOR A REGISTERED USER
const databaseReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const user = yield user_1.default.findOne({ _id });
        if (user) {
            res.json(user.botReplies);
        }
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});
exports.databaseReply = databaseReply;
