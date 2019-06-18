import React, { useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Index = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('socketToMe', (data) => {
      console.log(data);
    });
    axios.get('http://localhost:3000').then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
        <div>
        <p>Hello Next.js</p>
    </div>
  );
};

export default Index;
