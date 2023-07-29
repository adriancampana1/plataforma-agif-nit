import Joi from "joi";
import Course from "../models/course";
import CourseService from "../services/course.service";

const couseSchema = Joi.object({
  title: Joi.string().required().min(3).max(50),
  description: Joi.string().required().min(3).max(500),
  tags: Joi.array().required(),
  progress: Joi.number().required().min(0).max(100),
});

export default class CoursesController {

  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async getAllCourses(req: any, res: any) {
    try {
      const result = await CourseService.getAllCourses();
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCourse(req: any, res: any) {
    try {

      const { error } = couseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { title, description, tags, progress } = req.body;
      const course = new Course(title, description, tags, progress);
      const result = await this.courseService.createCourse(course);
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }


}