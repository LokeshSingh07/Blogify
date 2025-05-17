import React from 'react';

const Footer: React.FC = () => {
  
  const sections = [
    {
      title: 'Company',
      links: ['About', 'Careers', 'Press', 'Contact'],
    },
    {
      title: 'Resources',
      links: ['Blog', 'Help Center', 'Writing Guide', 'Community Guidelines'],
    },
    {
      title: 'Legal',
      links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'],
    },
  ];

  const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <a href="/" className="text-2xl font-bold text-green-600">Blogify</a>
            <p className="mt-4 text-gray-600">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium text-lg mb-4 text-gray-800">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 pb-5 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Blogify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {socialLinks.map((platform) => (
                <a key={platform} href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
