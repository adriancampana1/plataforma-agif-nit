-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'Admin';

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "classesCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_to_professors" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,

    CONSTRAINT "courses_to_professors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses_to_professors" ADD CONSTRAINT "courses_to_professors_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_to_professors" ADD CONSTRAINT "courses_to_professors_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
