import { verifyToken } from '@/lib/auth';
import connectMongo from '@/lib/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  try {
    await connectMongo();
    const token = req.headers.get('Authorization');
    
    if (!token) return NextResponse.json({ message: 'Unauthorized' , status: 401 });
    const decoded = verifyToken(token);
    //console.log(decoded, ' =============decoded=============')
    const posts = await Post.find({ user: decoded.id }).sort({ scheduledTime: -1 });
    return NextResponse.json({posts, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' , status: 500 });
  }
};
