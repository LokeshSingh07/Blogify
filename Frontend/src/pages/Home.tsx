import React from 'react';
import { useNavigate } from 'react-router-dom';



const LandingPage:React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-tl from-blue-900 via-gray-900 to-black text-white min-h-screen flex flex-col justify-between pt-10">
      {/* Header Section with Glow Effect */}
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold text-blue-500 text-shadow-lg ">
          Welcome to Tech Blog
        </h1>
        <p className="mt-4 text-lg text-gray-300 text-shadow-md">
          Your go-to platform for tech articles and discussions.
        </p>
      </header>

      {/* Main Section with Glowing Button */}
      <main className="flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-semibold text-center text-white text-shadow-lg">
          Explore, Learn, Share
        </h2>
        <p className="mt-4 text-lg text-gray-300 text-center">
          Stay updated with the latest trends in technology, programming, and more.
        </p>
        <button
          className="mt-6 px-8 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 hover:shadow-lg hover:scale-105 transition-all"
          onClick={() => navigate('/signup')}
        >
          Get Started
        </button>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-center py-4">
        <p className="text-sm text-gray-200">© 2025 Tech Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
