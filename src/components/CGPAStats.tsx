import React from 'react';
import { TrendingUp, Award, Target, BookOpen } from 'lucide-react';
import { Semester } from '../types';

interface CGPAStatsProps {
  semesters: Semester[];
  currentCGPA: number;
  totalCredits: number;
}

const CGPAStats: React.FC<CGPAStatsProps> = ({ semesters, currentCGPA, totalCredits }) => {
  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600 bg-green-50';
    if (gpa >= 3.0) return 'text-blue-600 bg-blue-50';
    if (gpa >= 2.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getGPALabel = (gpa: number) => {
    if (gpa >= 3.7) return 'Excellent';
    if (gpa >= 3.0) return 'Good';
    if (gpa >= 2.5) return 'Satisfactory';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Academic Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl p-6 ${getGPAColor(currentCGPA)}`}>
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{currentCGPA.toFixed(2)}</div>
              <div className="text-sm font-medium">Current CGPA</div>
              <div className="text-xs opacity-75">{getGPALabel(currentCGPA)}</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 text-purple-600 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{totalCredits}</div>
              <div className="text-sm font-medium">Total Credits</div>
              <div className="text-xs opacity-75">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 text-indigo-600 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{semesters.length}</div>
              <div className="text-sm font-medium">Semesters</div>
              <div className="text-xs opacity-75">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {semesters.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Semester Performance</h3>
          <div className="space-y-2">
            {semesters.map((semester) => (
              <div key={semester.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="font-medium text-gray-700">{semester.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{semester.totalCredits} credits</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGPAColor(semester.gpa)}`}>
                    {semester.gpa.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CGPAStats;