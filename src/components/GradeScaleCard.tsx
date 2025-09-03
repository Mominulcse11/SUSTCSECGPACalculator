import React from 'react';
import { gradeScale } from '../utils/gradeUtils';
import { BookOpen } from 'lucide-react';

const GradeScaleCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Grade Scale Reference</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {gradeScale.map((grade) => (
          <div
            key={grade.grade}
            className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="font-bold text-lg text-gray-800">{grade.grade}</div>
            <div className="text-sm text-blue-600 font-medium">{grade.points.toFixed(1)}</div>
            <div className="text-xs text-gray-500">{grade.minPercentage}%+</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeScaleCard;