"use client"
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const PostForm = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [scheduledTime, setScheduledTime] = useState('');

  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    setPlatforms((prev) =>
      checked ? [...prev, value] : prev.filter((platform) => platform !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    let response = await axios.post('/api/posts', { content, image, platforms, scheduledTime }, { headers: { Authorization: token } });
    if(response.status === 200){
      toast(`🦄${response.data.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setContent("");
      setImage("");
      setPlatforms([]);
      setScheduledTime("");
      setTimeout(()=>{
        router.push("/all-posts");
      }, 1000)
    }
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
       <ToastContainer />
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="space-y-2">
          {['facebook', 'youtube', 'linkedin', 'instagram', 'twitter'].map((platform) => (
            <label key={platform} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={platform}
                onChange={handlePlatformChange}
                className="h-4 w-4"
              />
              <span className="text-gray-700">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </label>
          ))}
        </div>
        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Schedule Post
        </button>
      </form>
    </div>
    </div>
  );
};

export default PostForm;
