import React from 'react';
import HeroSection from '../components/HeroSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import TopicsSection from '../components/TopicsSection';


const LandingPage: React.FC = () => {

  return (
    <div className="">
      
      <HeroSection/>
      <TopicsSection/>
      <NewsletterSection/>
      <Footer/>

      

    </div>
  );
};

export default LandingPage;
