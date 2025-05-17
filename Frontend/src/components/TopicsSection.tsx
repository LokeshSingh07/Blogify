import React from 'react';

const topics = [
  "Technology",
  "Programming",
  "Data Science",
  "Self Improvement",
  "Writing",
  "Relationships",
  "Machine Learning",
  "Productivity",
  "Politics"
];

const TopicsSection: React.FC = () => {
  return (
    <section className="py-8 bg-[#F5F5F0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-semibold text-2xl mb-6">Discover topics that matter to you</h2>
        
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <div 
              key={topic} 
              className="px-4 py-2 bg-white hover:bg-green-700 hover:text-white cursor-pointer transition-colors text-sm font-semibold rounded-full"
            >
              {topic}
            </div>
          ))}
          <div 
            className="px-4 py-2 bg-white hover:bg-green-700 hover:text-white cursor-pointer transition-colors text-sm font-semibold"
          >
            See more topics...
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;