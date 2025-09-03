import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Clock, FlaskConical } from 'lucide-react';
import { Semester, Course } from '../types';
import { sustCourses } from '../data/sustCourses';
import SUSTCourseForm from './SUSTCourseForm';

interface SUSTSemesterCardProps {
  semester: Semester;
  onUpdateSemester: (semester: Semester) => void;
  onDeleteSemester: (semesterId: string) => void;
}

const SUSTSemesterCard: React.FC<SUSTSemesterCardProps> = ({
  semester,
  onUpdateSemester,
  onDeleteSemester,
}) => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [semesterName, setSemesterName] = useState(semester.name);

  const handleAddCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };
    
    const updatedCourses = [...semester.courses, newCourse];
    const totalCredits = updatedCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = updatedCourses.reduce(
      (sum, course) => sum + course.credits * course.gradePoints,
      0
    );
    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

    // Calculate theory and lab hours if this is a predefined semester
    const predefinedCourses = sustCourses[semester.name] || [];
    let theoryHours = 0;
    let labHours = 0;
    
    updatedCourses.forEach(course => {
      const predefined = predefinedCourses.find(p => p.courseCode === course.courseCode);
      if (predefined) {
        theoryHours += predefined.theoryHours;
        labHours += predefined.labHours;
      }
    });

    onUpdateSemester({
      ...semester,
      courses: updatedCourses,
      gpa,
      totalCredits,
      theoryHours,
      labHours,
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    const updatedCourses = semester.courses.filter(course => course.id !== courseId);
    const totalCredits = updatedCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = updatedCourses.reduce(
      (sum, course) => sum + course.credits * course.gradePoints,
      0
    );
    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

    // Recalculate hours
    const predefinedCourses = sustCourses[semester.name] || [];
    let theoryHours = 0;
    let labHours = 0;
    
    updatedCourses.forEach(course => {
      const predefined = predefinedCourses.find(p => p.courseCode === course.courseCode);
      if (predefined) {
        theoryHours += predefined.theoryHours;
        labHours += predefined.labHours;
      }
    });

    onUpdateSemester({
      ...semester,
      courses: updatedCourses,
      gpa,
      totalCredits,
      theoryHours,
      labHours,
    });
  };

  const handleNameUpdate = () => {
    if (semesterName.trim()) {
      onUpdateSemester({ ...semester, name: semesterName.trim() });
      setEditingName(false);
    }
  };

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'CSE': return 'bg-blue-100 text-blue-800';
      case 'MAT': return 'bg-green-100 text-green-800';
      case 'PHY': return 'bg-purple-100 text-purple-800';
      case 'EEE': return 'bg-yellow-100 text-yellow-800';
      case 'ENG': return 'bg-pink-100 text-pink-800';
      case 'IPE': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          {editingName ? (
            <input
              type="text"
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              onBlur={handleNameUpdate}
              onKeyPress={(e) => e.key === 'Enter' && handleNameUpdate()}
              className="text-lg font-semibold text-gray-800 bg-transparent border-b border-emerald-300 focus:outline-none focus:border-emerald-500"
              autoFocus
            />
          ) : (
            <h3
              className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-emerald-600 transition-colors"
              onClick={() => setEditingName(true)}
            >
              {semester.name}
            </h3>
          )}
          <button
            onClick={() => setEditingName(true)}
            className="text-gray-400 hover:text-emerald-600 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => onDeleteSemester(semester.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Semester Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-emerald-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-emerald-600">
            {semester.gpa.toFixed(2)}
          </div>
          <div className="text-xs text-emerald-800">Semester GPA</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-blue-600">
            {semester.totalCredits}
          </div>
          <div className="text-xs text-blue-800">Credits</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center flex items-center justify-center space-x-1">
          <Clock className="w-4 h-4 text-purple-600" />
          <div>
            <div className="text-lg font-bold text-purple-600">{semester.theoryHours}</div>
            <div className="text-xs text-purple-800">Theory Hrs</div>
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center flex items-center justify-center space-x-1">
          <FlaskConical className="w-4 h-4 text-orange-600" />
          <div>
            <div className="text-lg font-bold text-orange-600">{semester.labHours}</div>
            <div className="text-xs text-orange-800">Lab Hrs</div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-3 mb-4">
        {semester.courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDepartmentColor(course.department)}`}>
                    {course.department}
                  </span>
                  <span className="text-sm font-mono text-gray-600">{course.courseCode}</span>
                </div>
                <div className="font-medium text-gray-800 mb-1">{course.courseName}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {course.credits} credits • Grade: {course.letterGrade} ({course.gradePoints.toFixed(2)})
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-gray-500">Attendance:</span> {course.attendance}/10
                  </div>
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-gray-500">Assignments:</span> {course.assignments}/20
                  </div>
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-gray-500">Class Eval:</span> {course.classEvaluation}/10
                  </div>
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-gray-500">Final:</span> {course.finalExam}/60
                  </div>
                  <div className="bg-white rounded px-2 py-1 font-medium">
                    <span className="text-gray-500">Total:</span> {course.totalMarks.toFixed(1)}%
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="text-gray-400 hover:text-red-600 transition-colors ml-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowCourseForm(true)}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-emerald-400 hover:text-emerald-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Course</span>
      </button>

      {showCourseForm && (
        <SUSTCourseForm
          onAddCourse={handleAddCourse}
          onClose={() => setShowCourseForm(false)}
          semesterName={semester.name}
        />
      )}
    </div>
  );
};

export default SUSTSemesterCard;