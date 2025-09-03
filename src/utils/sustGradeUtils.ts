import { GradeScale, AttendanceScale } from '../types';

export const sustGradeScale: GradeScale[] = [
  { letterGrade: 'A+', gradePoints: 4.00, minPercentage: 80, maxPercentage: 100 },
  { letterGrade: 'A', gradePoints: 3.75, minPercentage: 75, maxPercentage: 79.99 },
  { letterGrade: 'A-', gradePoints: 3.50, minPercentage: 70, maxPercentage: 74.99 },
  { letterGrade: 'B+', gradePoints: 3.25, minPercentage: 65, maxPercentage: 69.99 },
  { letterGrade: 'B', gradePoints: 3.00, minPercentage: 60, maxPercentage: 64.99 },
  { letterGrade: 'B-', gradePoints: 2.75, minPercentage: 55, maxPercentage: 59.99 },
  { letterGrade: 'C+', gradePoints: 2.50, minPercentage: 50, maxPercentage: 54.99 },
  { letterGrade: 'C', gradePoints: 2.25, minPercentage: 45, maxPercentage: 49.99 },
  { letterGrade: 'G', gradePoints: 2.00, minPercentage: 40, maxPercentage: 44.99 },
  { letterGrade: 'F', gradePoints: 0.00, minPercentage: 0, maxPercentage: 39.99 },
];

export const attendanceScale: AttendanceScale[] = [
  { minAttendance: 95, maxAttendance: 100, marks: 10 },
  { minAttendance: 90, maxAttendance: 94, marks: 9 },
  { minAttendance: 85, maxAttendance: 89, marks: 8 },
  { minAttendance: 80, maxAttendance: 84, marks: 7 },
  { minAttendance: 75, maxAttendance: 79, marks: 6 },
  { minAttendance: 70, maxAttendance: 74, marks: 5 },
  { minAttendance: 65, maxAttendance: 69, marks: 4 },
  { minAttendance: 60, maxAttendance: 64, marks: 3 },
  { minAttendance: 0, maxAttendance: 59, marks: 0 },
];

export const getGradeFromMarks = (totalMarks: number): { letterGrade: string; gradePoints: number } => {
  const grade = sustGradeScale.find(
    g => totalMarks >= g.minPercentage && totalMarks <= g.maxPercentage
  );
  return grade ? { letterGrade: grade.letterGrade, gradePoints: grade.gradePoints } : { letterGrade: 'F', gradePoints: 0 };
};

export const getAttendanceMarks = (attendancePercentage: number): number => {
  const scale = attendanceScale.find(
    s => attendancePercentage >= s.minAttendance && attendancePercentage <= s.maxAttendance
  );
  return scale ? scale.marks : 0;
};

export const calculateTotalMarks = (
  attendancePercentage: number,
  assignments: number,
  classEvaluation: number,
  finalExam: number
): number => {
  const attendanceMarks = getAttendanceMarks(attendancePercentage);
  return attendanceMarks + assignments + classEvaluation + finalExam;
};

export const calculateGPA = (courses: { credits: number; gradePoints: number }[]): number => {
  if (courses.length === 0) return 0;
  
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalGradePoints = courses.reduce((sum, course) => sum + (course.credits * course.gradePoints), 0);
  
  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
};

export const calculateRequiredGPA = (
  currentCGPA: number,
  currentCredits: number,
  targetCGPA: number,
  additionalCredits: number
): number => {
  if (additionalCredits <= 0) return targetCGPA;
  
  const currentGradePoints = currentCGPA * currentCredits;
  const targetGradePoints = targetCGPA * (currentCredits + additionalCredits);
  const requiredGradePoints = targetGradePoints - currentGradePoints;
  
  return requiredGradePoints / additionalCredits;
};