import React from 'react';
import { TrendingUp, Award, Target, BookOpen, Clock, FlaskConical } from 'lucide-react';
import { Semester } from '../types';

interface SUSTCGPAStatsProps {
  semesters: Semester[];
  currentCGPA: number;
  totalCredits: number;
}

const SUSTCGPAStats: React.FC<SUSTCGPAStatsProps> = ({ semesters, currentCGPA, totalCredits }) => {
  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.75) return 'text-green-600 bg-green-50 border-green-200';
    if (gpa >= 3.50) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (gpa >= 3.25) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (gpa >= 3.00) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    if (gpa >= 2.50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (gpa >= 2.00) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getGPALabel = (gpa: number) => {
    if (gpa >= 3.75) return 'Outstanding (A+/A)';
    if (gpa >= 3.50) return 'Excellent (A-)';
    if (gpa >= 3.25) return 'Very Good (B+)';
    if (gpa >= 3.00) return 'Good (B)';
    if (gpa >= 2.50) return 'Satisfactory (C+)';
    if (gpa >= 2.00) return 'Needs Improvement';
    return 'Poor Performance';
  };

  const totalTheoryHours = semesters.reduce((sum, sem) => sum + sem.theoryHours, 0);
  const totalLabHours = semesters.reduce((sum, sem) => sum + sem.labHours, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-bold text-gray-800">Academic Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`rounded-xl p-6 border ${getGPAColor(currentCGPA)}`}>
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{currentCGPA.toFixed(2)}</div>
              <div className="text-sm font-medium">Current CGPA</div>
              <div className="text-xs opacity-75">{getGPALabel(currentCGPA)}</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 text-purple-600 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{totalCredits}</div>
              <div className="text-sm font-medium">Total Credits</div>
              <div className="text-xs opacity-75">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 text-blue-600 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{totalTheoryHours}</div>
              <div className="text-sm font-medium">Theory Hours</div>
              <div className="text-xs opacity-75">Per Week</div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 text-orange-600 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center space-x-3">
            <FlaskConical className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{totalLabHours}</div>
              <div className="text-sm font-medium">Lab Hours</div>
              <div className="text-xs opacity-75">Per Week</div>
            </div>
          </div>
        </div>
      </div>

      {semesters.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Semester Performance</h3>
          <div className="space-y-3">
            {semesters.map((semester) => (
              <div key={semester.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{semester.name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGPAColor(semester.gpa)}`}>
                    {semester.gpa.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{semester.totalCredits} credits</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{semester.theoryHours}h theory</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FlaskConical className="w-4 h-4" />
                    <span>{semester.labHours}h lab</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SUSTCGPAStats;