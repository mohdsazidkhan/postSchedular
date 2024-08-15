import { verifyToken } from '@/lib/auth';
import connectMongo from '@/lib/mongodb';
import postToAllPlatforms from '@/lib/socialMedia';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectMongo();
  const { content, image, platforms, scheduledTime } = await req.json();
  const token = req.headers.get('Authorization');
  const user = verifyToken(token);
  try {
    const post = new Post({
      content,
      image,
      scheduledTime: new Date(scheduledTime),
      platforms,
      user: user.id,
    });
    await post.save();
    await postToAllPlatforms(post);
    post.status = 'posted';
    await post.save();
    return NextResponse.json({ message: 'Post Scheduled Successfully!', status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error in Scheduling Post', error, status: 500 });
  }
}
