import { GradeScale } from '../types';

export const gradeScale: GradeScale[] = [
  { grade: 'A+', points: 4.0, minPercentage: 97 },
  { grade: 'A', points: 4.0, minPercentage: 93 },
  { grade: 'A-', points: 3.7, minPercentage: 90 },
  { grade: 'B+', points: 3.3, minPercentage: 87 },
  { grade: 'B', points: 3.0, minPercentage: 83 },
  { grade: 'B-', points: 2.7, minPercentage: 80 },
  { grade: 'C+', points: 2.3, minPercentage: 77 },
  { grade: 'C', points: 2.0, minPercentage: 73 },
  { grade: 'C-', points: 1.7, minPercentage: 70 },
  { grade: 'D+', points: 1.3, minPercentage: 67 },
  { grade: 'D', points: 1.0, minPercentage: 65 },
  { grade: 'F', points: 0.0, minPercentage: 0 },
];

export const getGradePoints = (grade: string): number => {
  const gradeInfo = gradeScale.find(g => g.grade === grade);
  return gradeInfo ? gradeInfo.points : 0;
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