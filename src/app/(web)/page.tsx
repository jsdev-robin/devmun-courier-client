'use client';

import React, { useState } from 'react';
import HomHero from '../../components/home/HomHero';
import HomeWhyChoose from '../../components/home/HomeWhyChoose';
import HomeHowItWork from '../../components/home/HomeHowItWork';
import HomeCTA from '../../components/home/HomeCTA';
import { socket } from '../../lib/socket';

const HomePage = () => {
  const [msg, setMsg] = useState('');

  const sendMessage = () => {
    if (msg.trim()) {
      socket.emit('messageFromClient', msg);
      setMsg('');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="h-100">
          <h1 className="text-xl font-bold">Page A (Send)</h1>
          <input
            className="border p-2 mr-2"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type message"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <HomHero />
      <HomeWhyChoose />
      <HomeHowItWork />
      <HomeCTA />
    </div>
  );
};

export default HomePage;
