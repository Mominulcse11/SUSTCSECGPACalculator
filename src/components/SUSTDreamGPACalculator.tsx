import React, { useState } from 'react';
import { Target, Calculator, TrendingUp, AlertCircle, Star } from 'lucide-react';
import { calculateRequiredGPA } from '../utils/sustGradeUtils';
import { sustGradeScale } from '../utils/sustGradeUtils';

interface SUSTDreamGPACalculatorProps {
  currentCGPA: number;
  totalCredits: number;
}

const SUSTDreamGPACalculator: React.FC<SUSTDreamGPACalculatorProps> = ({
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
    const credits = parseFloat(additionalCredits);

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
      message = `Excellent! Your current CGPA already exceeds your target. You can maintain any passing grade and still achieve your goal.`;
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
    const recommendedGrades = sustGradeScale.filter(grade => grade.gradePoints >= requiredGPA);
    if (recommendedGrades.length === 0) return { grades: 'Not achievable', color: 'text-red-600' };
    
    const minGrade = recommendedGrades[recommendedGrades.length - 1];
    const maxGrade = recommendedGrades[0];
    
    if (minGrade.letterGrade === maxGrade.letterGrade) {
      return { grades: minGrade.letterGrade, color: 'text-emerald-600' };
    }
    
    return { 
      grades: `${minGrade.letterGrade} to ${maxGrade.letterGrade}`, 
      color: 'text-emerald-600' 
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-6 h-6 text-emerald-600" />
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g., 3.75"
            min="0"
            max="4.0"
            step="0.01"
          />
          <div className="text-xs text-gray-500 mt-1">
            SUST scale: 0.00 to 4.00
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Credits to Take
          </label>
          <input
            type="number"
            value={additionalCredits}
            onChange={(e) => setAdditionalCredits(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g., 19.5"
            min="0.5"
            step="0.5"
          />
          <div className="text-xs text-gray-500 mt-1">
            Each semester: 19.5 credits
          </div>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
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
                      <div className="text-2xl font-bold text-emerald-600">
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

      <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <h4 className="font-semibold text-emerald-800 mb-2 flex items-center space-x-2">
          <Star className="w-4 h-4" />
          <span>SUST CSE Success Tips:</span>
        </h4>
        <ul className="text-sm text-emerald-700 space-y-1">
          <li>• Maintain 95%+ attendance for full 10 marks (attendance below 50% = exam disqualification)</li>
          <li>• Focus on final exam preparation (60% weightage - highest impact on grade)</li>
          <li>• Complete all assignments and participate actively in class evaluations</li>
          <li>• Plan your course load considering theory and lab hour requirements</li>
          <li>• Check prerequisites before enrolling in advanced courses</li>
        </ul>
      </div>
    </div>
  );
};

export default SUSTDreamGPACalculator;