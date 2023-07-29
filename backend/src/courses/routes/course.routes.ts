import { Router } from "express";
import passport from "passport";
import CourseController from "../controllers/course.controller";
import CourseService from "../services/course.service";

const router = Router();
const coursesController = new CourseController(new CourseService());

router.get("/", passport.authenticate("jwt", { session: false }), coursesController.getAllCourses.bind(coursesController));
router.post("/", passport.authenticate("jwt", { session: false }), coursesController.createCourse.bind(coursesController));

export { router };