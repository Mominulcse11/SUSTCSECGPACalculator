import React, { useState } from 'react';
import { Target, Calculator, TrendingUp, AlertCircle } from 'lucide-react';
import { calculateRequiredGPA } from '../utils/gradeUtils';

interface DreamGPACalculatorProps {
  currentCGPA: number;
  totalCredits: number;
}

const DreamGPACalculator: React.FC<DreamGPACalculatorProps> = ({
  currentCGPA,
  totalCredits,
}) => {
  const [targetGPA, setTargetGPA] = useState('');
  const [additionalCredits, setAdditionalCredits] = useState('');
  const [result, setResult] = useState<{
    requiredGPA: number;
    isAchievable: boolean;
    message: string;
  } | null>(null);

  const handleCalculate = () => {
    const target = parseFloat(targetGPA);
    const credits = parseInt(additionalCredits);

    if (!target || !credits || target < 0 || target > 4.0 || credits <= 0) {
      setResult({
        requiredGPA: 0,
        isAchievable: false,
        message: 'Please enter valid values (GPA: 0.0-4.0, Credits: > 0)',
      });
      return;
    }

    if (totalCredits === 0) {
      setResult({
        requiredGPA: target,
        isAchievable: target <= 4.0,
        message: target <= 4.0 
          ? `You need to maintain a ${target.toFixed(2)} GPA in your upcoming courses.`
          : 'Target GPA cannot exceed 4.0',
      });
      return;
    }

    const requiredGPA = calculateRequiredGPA(currentCGPA, totalCredits, target, credits);

    let message = '';
    let isAchievable = true;

    if (requiredGPA > 4.0) {
      isAchievable = false;
      message = `Unfortunately, achieving a ${target.toFixed(2)} CGPA is not possible with ${credits} additional credits. You would need a ${requiredGPA.toFixed(2)} GPA, which exceeds the maximum of 4.0.`;
    } else if (requiredGPA < 0) {
      message = `Great news! Your current CGPA already exceeds your target. You can maintain any passing grade and still achieve your goal.`;
    } else {
      message = `To achieve a ${target.toFixed(2)} CGPA, you need to maintain a ${requiredGPA.toFixed(2)} GPA in your next ${credits} credits.`;
    }

    setResult({
      requiredGPA: Math.max(0, requiredGPA),
      isAchievable,
      message,
    });
  };

  const getGradeRecommendation = (requiredGPA: number) => {
    if (requiredGPA >= 3.7) return { grades: 'A- to A+', color: 'text-green-600' };
    if (requiredGPA >= 3.3) return { grades: 'B+ to A', color: 'text-blue-600' };
    if (requiredGPA >= 3.0) return { grades: 'B to B+', color: 'text-yellow-600' };
    if (requiredGPA >= 2.7) return { grades: 'B- to B', color: 'text-orange-600' };
    return { grades: 'C+ or better', color: 'text-red-600' };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800">Dream GPA Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target CGPA
          </label>
          <input
            type="number"
            value={targetGPA}
            onChange={(e) => setTargetGPA(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 3.5"
            min="0"
            max="4.0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Credits to Take
          </label>
          <input
            type="number"
            value={additionalCredits}
            onChange={(e) => setAdditionalCredits(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 15"
            min="1"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
      >
        <Calculator className="w-5 h-5" />
        <span>Calculate Required GPA</span>
      </button>

      {result && (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-start space-x-3">
            {result.isAchievable ? (
              <TrendingUp className="w-6 h-6 text-green-600 mt-1" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            )}
            <div className="flex-1">
              <p className="text-gray-800 mb-3">{result.message}</p>
              
              {result.isAchievable && result.requiredGPA > 0 && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Required GPA</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {result.requiredGPA.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Recommended Grades</div>
                      <div className={`text-lg font-semibold ${getGradeRecommendation(result.requiredGPA).color}`}>
                        {getGradeRecommendation(result.requiredGPA).grades}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Focus on courses with higher credit hours for maximum impact</li>
          <li>• Consider retaking courses with low grades if your institution allows</li>
          <li>• Plan your course load to balance difficulty and credit hours</li>
          <li>• Seek help early if you're struggling in any course</li>
        </ul>
      </div>
    </div>
  );
};

export default DreamGPACalculator;