"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const AllPosts = () => {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/all-posts', { headers: { Authorization: token } });
        setPosts(response.data.posts);
      } catch (err) {
        setError('Failed to load posts');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='flex flex-col h-screen py-4'>
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">All Scheduled Posts</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="p-4 border border-gray-300 shadow gap-4 rounded flex flex-row justify-start items-start">
              {post.image && <img width={160} height={120} src={post.image} alt={post.content} title={post.content}/>}
              <div className='flex flex-col gap-2'>
              <h2 className="text-lg font-semibold">{post.content}</h2>
              <p className="text-gray-600">Scheduled Time: {new Date(post.scheduledTime).toLocaleString()}</p>
              <p className="text-gray-600">Platforms: {post.platforms.join(', ')}</p>
              <p className="text-gray-600">Status: <span className={`${post.status === "scheduled" ? "text-red-600 capitalize" : "text-green-600 capitalize"}`}>{post.status}</span></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
    </div>
  );
};

export default AllPosts;
