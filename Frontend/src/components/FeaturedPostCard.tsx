import React from "react";

interface FeaturedPostCardProps {
  imageSrc: string;
  authorName: string;
  authorImage: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  topic: string;
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({
  imageSrc,
  authorName,
  authorImage,
  date,
  readTime,
  title,
  description,
  topic,
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <img src={imageSrc} alt="Featured post" className="w-full h-64 object-cover" />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img src={authorImage} alt="Author" className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-medium text-gray-900">{authorName}</p>
            <p className="text-sm text-gray-500">{date} · {readTime} read</p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-3">
          <a href="#">{title}</a>
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{topic}</span>
          <button className="text-gray-500 bg-gray-100 rounded-md px-2 py-1">Save</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostCard;
