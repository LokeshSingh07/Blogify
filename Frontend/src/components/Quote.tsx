import React from 'react';
import { Sparkles, BookOpen, Users } from 'lucide-react';


export const Quote: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col justify-center py-6 px-4 sm:px-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold w-fit mb-6">
        <Sparkles className="w-3.5 h-3.5 text-green-700" />
        <span>Welcome to the Blogify community</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
        Stay curious. <br />
        <span className="text-green-700">Discover stories</span>, thinking, and expertise.
      </h2>

      <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
        Read and share ideas from independent voices, world-class publications, and experts from around the globe. Everyone's welcome.
      </p>


      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm relative overflow-hidden"> 
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://res.cloudinary.com/dcyjap6ft/image/upload/v1747490383/extra/L_ugkphn.jpg"
            alt="Lokesh Singh"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-green-100"
          />
          <div>
            <p className="font-semibold text-sm text-gray-900">Lokesh Singh</p>
            <p className="text-xs text-gray-500">Featured Author · 8 min read</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 text-base mb-1.5 line-clamp-1">
          The Future of Web Development: Trends to Watch in 2025
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
          Explore cutting-edge technologies and methodologies shaping the landscape of modern publishing and development.
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span className="bg-green-50 text-green-700 font-medium px-2.5 py-0.5 rounded-full text-xs">
            Web Development
          </span>
          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
            <Users className="w-3.5 h-3.5 text-green-700" />
            <span>10,000+ readers</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-green-700" />
          <span>Unlimited stories</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-green-700" />
          <span>Ad-free experience</span>
        </div>
      </div>
    </div>
  );
};
