
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectMongo();
  const { username, password, mobileNumber, socialMedia } = await req.json();
  try {
    // Check if a user with the same username or mobileNumber already exists
    const existingUser = await User.findOne({
      $or: [
        { username: username },
        { mobileNumber: mobileNumber }
      ]
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'User already exists!',
        status: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      mobileNumber,
      socialMedia,
    });

    let createdUser = await newUser.save();
    return NextResponse.json({
      success: true,
      message: 'User Registered Successfully!',
      status: 201,
      data: createdUser
     })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error in registering user',
      status: 500
     })
  }
}
