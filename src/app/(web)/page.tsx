'use client';

import React from 'react';
import HomHero from '../../components/pages/home/HomHero';
import HomeWhyChoose from '../../components/pages/home/HomeWhyChoose';
import HomeHowItWork from '../../components/pages/home/HomeHowItWork';
import HomeCTA from '../../components/pages/home/HomeCTA';

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
