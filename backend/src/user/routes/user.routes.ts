import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import passport from "passport";
import { UserService } from "../../user/services/user.service";

const router = Router();
const userController = new UserController(new UserService);

router.get("/", passport.authenticate("jwt", { session: false }), userController.getAllUsers.bind(userController));

router.post("/register", userController.registerUser.bind(userController));
router.post("/login", userController.loginUser.bind(userController));

export { router };