import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Index = () => {
  useEffect(() => {
    const comments = io('http://localhost:3000/comments');
    comments.emit('thread_join', { thread_id: 1 });
    comments.emit('add_comment', {
      comment: 'commmmmennnnnnnnt!', user_id: 4, thread_id: 1
    });
    comments.emit('to_thread_broadcast', { value: 'Musashi Joined!', threadName: 'fire' });
    comments.on('add_comment_client', (data) => {
      console.log(data.comment);
    });
  }, []);

  return (
        <div>
        <p>Hello Next.js</p>
    </div>
  );
};

export default Index;
