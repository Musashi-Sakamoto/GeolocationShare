import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Index = () => {
  useEffect(() => {
    const comments = io('http://localhost:3000/comments');
    comments.emit('thread_join', { threadName: 'fire' });
    comments.emit('to_thread', { value: 'Comment', threadName: 'fire' });
    comments.emit('to_thread_broadcast', { value: 'Musashi Joined!', threadName: 'fire' });
    comments.on('to_thread_client', (data) => {
      console.log(data.value);
    });
  }, []);

  return (
        <div>
        <p>Hello Next.js</p>
    </div>
  );
};

export default Index;
