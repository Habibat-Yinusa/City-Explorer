import * as user from "../controllers/userControllers";
import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

//signup
router.post("/signup", user.createUser);

//login
router.post("/login", user.loginUser)

//forgotPassword
router.post("/forgot-password", user.forgotPassword)

export default router