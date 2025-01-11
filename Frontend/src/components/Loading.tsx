import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50">
      <div className="relative w-32 h-32 bg-transparent border-4 border-white rounded-lg overflow-hidden">
        <div className="absolute inset-0 border-4 border-blue-500 animate-border"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-xl font-bold text-white animate-pulse">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
