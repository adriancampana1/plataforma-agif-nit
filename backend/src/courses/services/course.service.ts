import { collections } from "../../database/database.service";
import { ServiceResponse } from "../../utils/types/service.response";
import Course from "../models/course";

export default class CourseService {

  async createCourse(course: Course): Promise<ServiceResponse<Course>> {
    try {
      await course.createCourse();
      return {
        statusCode: 201,
        message: "Course created successfully",
        data: course,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        message: error.message,
        data: error,
      };
    }
  }


  // utils
  static async getAllCourses(): Promise<ServiceResponse<Course[]>> {
    try {
      const courses = await collections.courses?.find({}).toArray();
      console.log(courses);
      return {
        statusCode: 200,
        message: "Courses retrieved successfully",
        data: courses as unknown as Course[],
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        message: error.message,
        data: error,
      };
    }
  }
}