'use client';

import React from 'react';
import HomHero from '../../components/ui/home/HomHero';
import HomeWhyChoose from '../../components/ui/home/HomeWhyChoose';
import HomeHowItWork from '../../components/ui/home/HomeHowItWork';
import HomeCTA from '../../components/ui/home/HomeCTA';

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
