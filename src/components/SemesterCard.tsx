import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react';
import { Semester, Course } from '../types';
import CourseForm from './CourseForm';

interface SemesterCardProps {
  semester: Semester;
  onUpdateSemester: (semester: Semester) => void;
  onDeleteSemester: (semesterId: string) => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({
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

    onUpdateSemester({
      ...semester,
      courses: updatedCourses,
      gpa,
      totalCredits,
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

    onUpdateSemester({
      ...semester,
      courses: updatedCourses,
      gpa,
      totalCredits,
    });
  };

  const handleNameUpdate = () => {
    if (semesterName.trim()) {
      onUpdateSemester({ ...semester, name: semesterName.trim() });
      setEditingName(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          {editingName ? (
            <input
              type="text"
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              onBlur={handleNameUpdate}
              onKeyPress={(e) => e.key === 'Enter' && handleNameUpdate()}
              className="text-lg font-semibold text-gray-800 bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          ) : (
            <h3
              className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => setEditingName(true)}
            >
              {semester.name}
            </h3>
          )}
          <button
            onClick={() => setEditingName(true)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
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

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {semester.gpa.toFixed(2)}
          </div>
          <div className="text-sm text-blue-800">Semester GPA</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {semester.totalCredits}
          </div>
          <div className="text-sm text-green-800">Total Credits</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {semester.courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="font-medium text-gray-800">{course.name}</div>
              <div className="text-sm text-gray-600">
                {course.credits} credits • Grade: {course.grade} ({course.gradePoints.toFixed(1)})
              </div>
            </div>
            <button
              onClick={() => handleDeleteCourse(course.id)}
              className="text-gray-400 hover:text-red-600 transition-colors ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowCourseForm(true)}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Course</span>
      </button>

      {showCourseForm && (
        <CourseForm
          onAddCourse={handleAddCourse}
          onClose={() => setShowCourseForm(false)}
        />
      )}
    </div>
  );
};

export default SemesterCard;