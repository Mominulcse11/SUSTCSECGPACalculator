import React from 'react';
import { sustGradeScale, attendanceScale } from '../utils/sustGradeUtils';
import { BookOpen, Users, AlertTriangle } from 'lucide-react';

const SUSTGradeScaleCard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* SUST Grading System */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-800">SUST Grading System</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-medium text-gray-700">Marks (%)</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Letter Grade</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Grade Points</th>
              </tr>
            </thead>
            <tbody>
              {sustGradeScale.map((grade) => (
                <tr key={grade.letterGrade} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-600">
                    {grade.maxPercentage === 100 
                      ? `${grade.minPercentage}% and above`
                      : `${grade.minPercentage}% to ${grade.maxPercentage}%`
                    }
                  </td>
                  <td className="py-2 px-3">
                    <span className={`font-bold ${
                      grade.gradePoints >= 3.5 ? 'text-green-600' :
                      grade.gradePoints >= 3.0 ? 'text-blue-600' :
                      grade.gradePoints >= 2.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {grade.letterGrade}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-medium text-gray-800">
                    {grade.gradePoints.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Marking System */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Attendance Marking System</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {attendanceScale.map((scale, index) => (
            <div
              key={index}
              className={`rounded-lg p-3 text-center border ${
                scale.marks >= 8 ? 'bg-green-50 border-green-200' :
                scale.marks >= 6 ? 'bg-blue-50 border-blue-200' :
                scale.marks >= 4 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="font-bold text-lg text-gray-800">
                {scale.maxAttendance === 100 
                  ? `${scale.minAttendance}%+`
                  : `${scale.minAttendance}-${scale.maxAttendance}%`
                }
              </div>
              <div className={`text-sm font-medium ${
                scale.marks >= 8 ? 'text-green-600' :
                scale.marks >= 6 ? 'text-blue-600' :
                scale.marks >= 4 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {scale.marks}/10 marks
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800 font-medium">
              Important: Students with less than 50% attendance cannot appear in the final examination.
            </p>
          </div>
        </div>
      </div>

      {/* Marks Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Marks Distribution</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">10%</div>
            <div className="text-sm text-purple-800">Class Attendance</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">20%</div>
            <div className="text-sm text-blue-800">Assignments & Mid-Sem</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">10%</div>
            <div className="text-sm text-green-800">Class Evaluation</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">60%</div>
            <div className="text-sm text-red-800">Final Examination</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SUSTGradeScaleCard;