import React from 'react';
import { GraduationCap, School } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <School className="w-12 h-12" />
          <div className="text-center">
            <h1 className="text-4xl font-bold">SUST CSE CGPA Calculator</h1>
            <p className="text-emerald-100 text-lg">Session 2024-2025</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-blue-100">
          <GraduationCap className="w-5 h-5" />
          <p className="text-lg">Shahjalal University of Science & Technology</p>
        </div>
      </div>
    </header>
  );
};

export default Header;