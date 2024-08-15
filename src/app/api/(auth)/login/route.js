import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    await connectMongo();
    const { username, password } = await req.json();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: 'User not found', status: 404 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials', status: 401 });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({token, status: 201, message: 'User Login Successfully!'});
  } catch (error) {
    return NextResponse.json({ message: 'Server error' , status: 500 });
  }
};
