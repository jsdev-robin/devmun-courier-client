import React from 'react';
import HomHero from '../../components/home/HomHero';
import HomeWhyChoose from '../../components/home/HomeWhyChoose';
import HomeHowItWork from '../../components/home/HomeHowItWork';
import HomeCTA from '../../components/home/HomeCTA';

const HomePage = () => {
  return (
    <>
      <HomHero />
      <HomeWhyChoose />
      <HomeHowItWork />
      <HomeCTA />
    </>
  );
};

export default HomePage;
