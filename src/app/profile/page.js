"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileForm = () => {
  const router = useRouter();
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: '',
    twitter: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/profile', { headers: { Authorization: token } });
      setSocialMedia(response.data.user.socialMedia);
    };
    fetchData();
  }, []);

  const handleLogout = () =>{
    localStorage.clear();
    toast(`🦄 Logout Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(()=>{
      router.push("/");
    }, 1000)
  }

  const handleChange = (e) => {
    setSocialMedia((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = 'your_jwt_token'; // Replace with actual token handling logic
    await axios.put('/api/auth/update', { socialMedia }, { headers: { Authorization: token } });
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <ToastContainer />
    <div className="max-w-sm mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['facebook', 'youtube', 'linkedin', 'instagram', 'twitter'].map((platform) => (
          <input
            key={platform}
            type="text"
            name={platform}
            value={socialMedia[platform]}
            onChange={handleChange}
            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Username`}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
      <div className='flex flex-col gap-2 mt-4'>
      <button
          onClick={()=>router.push("/create-post")}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Post
        </button>
        <button
          onClick={()=>handleLogout()}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
        </div>
    </div>
    </div>
  );
};

export default ProfileForm;
