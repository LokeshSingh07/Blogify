import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../components/Auth';
import { Quote } from '../components/Quote';

export const Signin: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col justify-between">
      <header className="w-full bg-[#F5F5F0] border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="blog-title text-2xl font-bold text-green-700 hover:opacity-90 transition-opacity"
          >
            Blogify
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <span className="hidden md:inline text-gray-600">New here?</span>
            <Link
              to="/signup"
              className="bg-green-700 hover:bg-green-600 text-white text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-colors"
            >Get Started</Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="w-full flex justify-center items-center">
            <Auth type="signin" />
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <Quote />
          </div>
        </div>
      </main>
    </div>
  );
};
