import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Semester } from './types';
import { calculateGPA } from './utils/sustGradeUtils';
import { sustCourses } from './data/sustCourses';
import Header from './components/Header';
import SUSTGradeScaleCard from './components/SUSTGradeScaleCard';
import SUSTSemesterCard from './components/SUSTSemesterCard';
import SUSTCGPAStats from './components/SUSTCGPAStats';
import SUSTDreamGPACalculator from './components/SUSTDreamGPACalculator';

function App() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [currentCGPA, setCurrentCGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSemesters = localStorage.getItem('sust-cgpa-calculator-semesters');
    if (savedSemesters) {
      setSemesters(JSON.parse(savedSemesters));
    }
  }, []);

  // Save data to localStorage and recalculate CGPA whenever semesters change
  useEffect(() => {
    localStorage.setItem('sust-cgpa-calculator-semesters', JSON.stringify(semesters));
    
    const allCourses = semesters.flatMap(semester => semester.courses);
    const cgpa = calculateGPA(allCourses);
    const credits = allCourses.reduce((sum, course) => sum + course.credits, 0);
    
    setCurrentCGPA(cgpa);
    setTotalCredits(credits);
  }, [semesters]);

  const addSemester = () => {
    const semesterOptions = Object.keys(sustCourses);
    const nextSemester = semesterOptions.find(option => 
      !semesters.some(sem => sem.name === option)
    ) || `Custom Semester ${semesters.length + 1}`;

    const newSemester: Semester = {
      id: Date.now().toString(),
      name: nextSemester,
      year: Math.ceil((semesters.length + 1) / 2),
      semesterNumber: ((semesters.length) % 2) + 1,
      courses: [],
      gpa: 0,
      totalCredits: 0,
      theoryHours: 0,
      labHours: 0,
    };
    setSemesters([...semesters, newSemester]);
  };

  const addPredefinedSemester = (semesterName: string) => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: semesterName,
      year: semesterName.includes('1st') ? 1 : Math.ceil((semesters.length + 1) / 2),
      semesterNumber: semesterName.includes('1st Semester') ? 1 : 2,
      courses: [],
      gpa: 0,
      totalCredits: 0,
      theoryHours: 0,
      labHours: 0,
    };
    setSemesters([...semesters, newSemester]);
  };

  const updateSemester = (updatedSemester: Semester) => {
    setSemesters(semesters.map(semester => 
      semester.id === updatedSemester.id ? updatedSemester : semester
    ));
  };

  const deleteSemester = (semesterId: string) => {
    setSemesters(semesters.filter(semester => semester.id !== semesterId));
  };

  const availablePredefinedSemesters = Object.keys(sustCourses).filter(
    semesterName => !semesters.some(sem => sem.name === semesterName)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* CGPA Stats */}
            <SUSTCGPAStats 
              semesters={semesters}
              currentCGPA={currentCGPA}
              totalCredits={totalCredits}
            />

            {/* Dream GPA Calculator */}
            <SUSTDreamGPACalculator 
              currentCGPA={currentCGPA}
              totalCredits={totalCredits}
            />

            {/* Semesters */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">Your Academic Progress</h2>
                <div className="flex flex-wrap gap-2">
                  {availablePredefinedSemesters.map((semesterName) => (
                    <button
                      key={semesterName}
                      onClick={() => addPredefinedSemester(semesterName)}
                      className="bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                      Add {semesterName}
                    </button>
                  ))}
                  <button
                    onClick={addSemester}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Custom Semester</span>
                  </button>
                </div>
              </div>
              
              {semesters.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Plus className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Start Your Academic Journey
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add your first semester to begin tracking your CGPA progress at SUST CSE
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => addPredefinedSemester('1st Year - 1st Semester')}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add 1st Year - 1st Semester</span>
                    </button>
                    <button
                      onClick={() => addPredefinedSemester('1st Year - 2nd Semester')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add 1st Year - 2nd Semester</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {semesters.map((semester) => (
                    <SUSTSemesterCard
                      key={semester.id}
                      semester={semester}
                      onUpdateSemester={updateSemester}
                      onDeleteSemester={deleteSemester}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <SUSTGradeScaleCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;