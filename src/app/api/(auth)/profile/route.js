import { verifyToken } from '@/lib/auth';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  try {
    await connectMongo();
    console.log(req.headers.get('Authorization'), ' ================Authorization==========')
    const token = req.headers.get('Authorization');
    if (!token) return NextResponse.json({ message: 'Unauthorized', status: 401 });
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ message: 'User not found', status: 404 });
    return NextResponse.json({user, status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Server error', status: 500});
  }
};
