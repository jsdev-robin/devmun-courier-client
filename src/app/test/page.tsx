'use client';

import React, { useEffect, useState } from 'react';
import { socket } from '../../lib/socket';

const Home = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('messageFromServer', (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('messageFromServer');
    };
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Page B (Receive)</h1>
      <div className="mt-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="border p-2 rounded">
            {m}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
