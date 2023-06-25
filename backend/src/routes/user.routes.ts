import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import passport from "passport";
import { userService } from "../services/user.service";

const router = Router();
const userController = new UserController(new userService);

router.get("/", passport.authenticate("jwt", { session: false }), userController.getAllUsers.bind(userController));

router.post("/register", userController.registerUser.bind(userController));
router.post("/login", userController.loginUser.bind(userController));

export { router };