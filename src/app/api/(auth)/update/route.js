import connectMongo from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { verifyToken } from '../../../../lib/auth';

export async function PUT(req) {
  await connectMongo();
  const { socialMedia } = await req.json();
  const token = req.headers.get('Authorization');
  const user = verifyToken(token);

  try {
    await User.findByIdAndUpdate(user.id, { socialMedia });
    return new Response(JSON.stringify({ message: 'User updated successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating user', error }), { status: 500 });
  }
}
