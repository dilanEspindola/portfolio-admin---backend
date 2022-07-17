import { Router } from "express";
import * as userController from "../controllers/UserController";
const router = Router();

router.get("/", userController.userGet);
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

export default router;
