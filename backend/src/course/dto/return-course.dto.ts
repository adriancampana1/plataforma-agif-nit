import { CourseEntity } from '../entities/course.entity';

export class ReturnCourseDto {
  id?: string;
  title: string;
  description: string;
  tags?: string[];
  classesCount?: number;

  constructor(course: CourseEntity) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.tags = course.tags as string[];
    this.classesCount = course.classesCount;
  }
}
