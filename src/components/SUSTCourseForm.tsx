import React, { useState } from 'react';
import { Plus, X, Calculator } from 'lucide-react';
import { Course, PredefinedCourse } from '../types';
import { sustCourses } from '../data/sustCourses';
import { calculateTotalMarks, getGradeFromMarks, getAttendanceMarks } from '../utils/sustGradeUtils';

interface SUSTCourseFormProps {
  onAddCourse: (course: Omit<Course, 'id'>) => void;
  onClose: () => void;
  semesterName: string;
}

const SUSTCourseForm: React.FC<SUSTCourseFormProps> = ({ onAddCourse, onClose, semesterName }) => {
  const [selectedCourse, setSelectedCourse] = useState<PredefinedCourse | null>(null);
  const [customCourse, setCustomCourse] = useState({
    courseCode: '',
    courseName: '',
    credits: '',
    department: '',
  });
  const [useCustomCourse, setUseCustomCourse] = useState(false);
  
  // Marks input
  const [attendancePercentage, setAttendancePercentage] = useState('');
  const [assignments, setAssignments] = useState('');
  const [classEvaluation, setClassEvaluation] = useState('');
  const [finalExam, setFinalExam] = useState('');

  const predefinedCourses = sustCourses[semesterName] || [];

  const calculatePreview = () => {
    const attendance = parseFloat(attendancePercentage) || 0;
    const assignmentMarks = parseFloat(assignments) || 0;
    const classEvalMarks = parseFloat(classEvaluation) || 0;
    const finalMarks = parseFloat(finalExam) || 0;

    const attendanceMarks = getAttendanceMarks(attendance);
    const total = attendanceMarks + assignmentMarks + classEvalMarks + finalMarks;
    const grade = getGradeFromMarks(total);

    return {
      attendanceMarks,
      total,
      grade,
      canAppearInExam: attendance >= 50,
    };
  };

  const preview = calculatePreview();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const courseInfo = useCustomCourse ? {
      courseCode: customCourse.courseCode,
      courseName: customCourse.courseName,
      credits: parseFloat(customCourse.credits),
      department: customCourse.department,
    } : {
      courseCode: selectedCourse!.courseCode,
      courseName: selectedCourse!.courseName,
      credits: selectedCourse!.credits,
      department: selectedCourse!.department,
    };

    if (!courseInfo.courseCode || !courseInfo.courseName || !courseInfo.credits) return;

    const attendance = parseFloat(attendancePercentage) || 0;
    const assignmentMarks = parseFloat(assignments) || 0;
    const classEvalMarks = parseFloat(classEvaluation) || 0;
    const finalMarks = parseFloat(finalExam) || 0;

    const attendanceMarks = getAttendanceMarks(attendance);
    const totalMarks = attendanceMarks + assignmentMarks + classEvalMarks + finalMarks;
    const grade = getGradeFromMarks(totalMarks);

    onAddCourse({
      courseCode: courseInfo.courseCode,
      courseName: courseInfo.courseName,
      credits: courseInfo.credits,
      department: courseInfo.department,
      attendance: attendanceMarks,
      assignments: assignmentMarks,
      classEvaluation: classEvalMarks,
      finalExam: finalMarks,
      totalMarks,
      letterGrade: grade.letterGrade,
      gradePoints: grade.gradePoints,
      prerequisite: selectedCourse?.prerequisite,
    });

    // Reset form
    setSelectedCourse(null);
    setCustomCourse({ courseCode: '', courseName: '', credits: '', department: '' });
    setAttendancePercentage('');
    setAssignments('');
    setClassEvaluation('');
    setFinalExam('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Add Course - {semesterName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Selection */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={!useCustomCourse}
                  onChange={() => setUseCustomCourse(false)}
                  className="text-emerald-600"
                />
                <span className="font-medium text-gray-700">Select from SUST CSE Curriculum</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={useCustomCourse}
                  onChange={() => setUseCustomCourse(true)}
                  className="text-emerald-600"
                />
                <span className="font-medium text-gray-700">Add Custom Course</span>
              </label>
            </div>

            {!useCustomCourse ? (
              <select
                value={selectedCourse?.courseCode || ''}
                onChange={(e) => {
                  const course = predefinedCourses.find(c => c.courseCode === e.target.value);
                  setSelectedCourse(course || null);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
                <option value="">Select a course</option>
                {predefinedCourses.map((course) => (
                  <option key={course.courseCode} value={course.courseCode}>
                    {course.courseCode} - {course.courseName} ({course.credits} credits)
                  </option>
                ))}
              </select>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={customCourse.courseCode}
                  onChange={(e) => setCustomCourse({...customCourse, courseCode: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Course Code"
                  required
                />
                <input
                  type="text"
                  value={customCourse.courseName}
                  onChange={(e) => setCustomCourse({...customCourse, courseName: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Course Name"
                  required
                />
                <input
                  type="number"
                  value={customCourse.credits}
                  onChange={(e) => setCustomCourse({...customCourse, credits: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Credits"
                  step="0.5"
                  min="0.5"
                  max="6"
                  required
                />
                <input
                  type="text"
                  value={customCourse.department}
                  onChange={(e) => setCustomCourse({...customCourse, department: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Department"
                  required
                />
              </div>
            )}
          </div>

          {/* Marks Input */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Enter Your Marks</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attendance Percentage
                </label>
                <input
                  type="number"
                  value={attendancePercentage}
                  onChange={(e) => setAttendancePercentage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., 85"
                  min="0"
                  max="100"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Attendance marks: {preview.attendanceMarks}/10
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignments & Mid-Semester (out of 20)
                </label>
                <input
                  type="number"
                  value={assignments}
                  onChange={(e) => setAssignments(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., 18"
                  min="0"
                  max="20"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Evaluation (out of 10)
                </label>
                <input
                  type="number"
                  value={classEvaluation}
                  onChange={(e) => setClassEvaluation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., 9"
                  min="0"
                  max="10"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Examination (out of 60)
                </label>
                <input
                  type="number"
                  value={finalExam}
                  onChange={(e) => setFinalExam(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., 50"
                  min="0"
                  max="60"
                  step="0.5"
                />
              </div>
            </div>

            {/* Preview */}
            {(attendancePercentage || assignments || classEvaluation || finalExam) && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-2">Grade Preview:</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-800">{preview.total.toFixed(1)}%</div>
                    <div className="text-xs text-gray-600">Total Marks</div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold ${
                      preview.grade.gradePoints >= 3.5 ? 'text-green-600' :
                      preview.grade.gradePoints >= 3.0 ? 'text-blue-600' :
                      preview.grade.gradePoints >= 2.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {preview.grade.letterGrade}
                    </div>
                    <div className="text-xs text-gray-600">Letter Grade</div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold ${
                      preview.grade.gradePoints >= 3.5 ? 'text-green-600' :
                      preview.grade.gradePoints >= 3.0 ? 'text-blue-600' :
                      preview.grade.gradePoints >= 2.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {preview.grade.gradePoints.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-600">Grade Points</div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold ${
                      preview.canAppearInExam ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {preview.canAppearInExam ? '✓' : '✗'}
                    </div>
                    <div className="text-xs text-gray-600">Exam Eligible</div>
                  </div>
                </div>
                
                {!preview.canAppearInExam && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">
                      ⚠️ Warning: Attendance below 50% - Cannot appear in final examination
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={(!selectedCourse && !useCustomCourse) || !preview.canAppearInExam}
              className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SUSTCourseForm;