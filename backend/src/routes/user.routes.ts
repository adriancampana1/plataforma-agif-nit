import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAllUsers.bind(userController));
router.post("/", userController.createUser.bind(userController));

export { router };