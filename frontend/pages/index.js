import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Index = () => {
  useEffect(() => {
    const comments = io('http://localhost:3000/comments');
    const locations = io('http://localhost:3000/locations');
    const threads = io('http://localhost:3000/threads');
    threads.emit('add_thread', { title: 'threaddddd', user_id: 4 });
    threads.on('add_thread_client', (data) => {
      console.log(data);
    });
    locations.emit('thread_join', { thread_id: 4 });
    locations.emit('upsert_location', {
      user_id: 4, thread_id: 4, latitude: 35.689487, longitude: 139.691711
    });
    locations.on('upsert_location_client', (data) => {
      console.log(data.location);
    });
    comments.emit('thread_join', { thread_id: 4 });
    comments.emit('add_comment', {
      comment: 'commmmmennnnnnnnt!', user_id: 4, thread_id: 4
    });
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
