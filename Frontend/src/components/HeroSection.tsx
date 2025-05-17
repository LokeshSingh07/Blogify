import React from "react";
import { useNavigate } from "react-router-dom";
import FeaturedPostCard from "./FeaturedPostCard";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Text */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
              Stay curious. <br />
              Discover stories, thinking, and expertise.
            </h1>
            <p className="text-lg mb-8 text-gray-700 max-w-md">
              Read and share ideas from independent voices, world-class publications, and experts from around the globe. Everyone's welcome.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-full"
            >
              Start Reading
            </button>
          </div>

          {/* Featured Post Card */}
          <div className="md:w-1/2">
            <FeaturedPostCard
              imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              authorName="Lokesh Singh"
              authorImage="https://res.cloudinary.com/dcyjap6ft/image/upload/v1747490383/extra/L_ugkphn.jpg"
              date="May 14"
              readTime="8 min"
              title="The Future of Web Development: Trends to Watch in 2025"
              description="Explore the cutting-edge technologies and methodologies shaping the landscape of modern web development."
              topic="Web Development"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
