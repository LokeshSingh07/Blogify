import React from 'react';

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F5F5F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Never miss a story
          </h2>
          <p className="text-gray-600 mb-8">
            Get the best articles delivered straight to your inbox. Unsubscribe at any time.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              required
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={()=> {}}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
