import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 text-gray-100">
      <h1 className="text-9xl font-extrabold text-blue-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-black mb-4">
        Page Not Found
      </p>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, we couldn't find the page you're looking for. 
        It might have been moved or deleted.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 text-gray-100 bg-black hover:bg-gray-800 transition-all rounded-lg shadow-md border border-gray-700"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 text-gray-100 bg-black hover:bg-gray-800 transition-all rounded-lg shadow-md border border-gray-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
