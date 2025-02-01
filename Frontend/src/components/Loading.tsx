import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center p-6 bg-gray-900 rounded-2xl shadow-lg">
        <div className="relative w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-500 rounded-2xl flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-transparent border-t-white border-l-white rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-white text-lg font-semibold">Loading Component</p>
        {/* <p className="text-white text-sm opacity-80">Installing packages</p> */}
      </div>
    </div>
  );
};

export default Loading;
