"use client"
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: '',
    twitter: '',
  });

  const handleChange = (e) => {
    setSocialMedia((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        mobileNumber,
        socialMedia,
      });
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
        setTimeout(()=>{
          router.push("/login");
        }, 1000)
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <>
    <ToastContainer />
    <div className="max-w-sm mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Mobile Number"
          className="w-full p-2 border border-gray-300 rounded"
        />
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
          Register
        </button>
      </form>
      <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login">
              <span className="text-blue-500 hover:underline">Login</span>
            </Link>
          </p>
        </div>
    </div>
    </>
  );
};

export default RegisterForm;
