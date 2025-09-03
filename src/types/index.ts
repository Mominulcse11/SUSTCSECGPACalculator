export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  department: string;
  // Marks breakdown
  attendance: number; // out of 10
  assignments: number; // out of 20
  classEvaluation: number; // out of 10
  finalExam: number; // out of 60
  totalMarks: number; // calculated total
  letterGrade: string;
  gradePoints: number;
  prerequisite?: string;
}

export interface Semester {
  id: string;
  name: string;
  year: number;
  semesterNumber: number;
  courses: Course[];
  gpa: number;
  totalCredits: number;
  theoryHours: number;
  labHours: number;
}

export interface GradeScale {
  letterGrade: string;
  gradePoints: number;
  minPercentage: number;
  maxPercentage: number;
}

export interface AttendanceScale {
  minAttendance: number;
  maxAttendance: number;
  marks: number;
}

export interface PredefinedCourse {
  courseCode: string;
  courseName: string;
  credits: number;
  department: string;
  theoryHours: number;
  labHours: number;
  prerequisite?: string;
}