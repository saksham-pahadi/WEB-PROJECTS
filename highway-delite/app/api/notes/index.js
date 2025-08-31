import dbConnect from '../../../lib/db';
import Note from '../../../models/Note';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

async function verifyToken(req){
  const token = req.cookies?.token || (req.headers.authorization||'').split(' ')[1];
  if(!token) throw new Error('Unauthenticated');
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
}

export default async function handler(req,res){
  await dbConnect();
  try{
    const payload = await verifyToken(req);
    const userId = payload.userId;
    if(req.method === 'POST'){
      const { title, content } = req.body;
      if(!content) return res.status(400).json({ error:'Content required' });
      const note = await Note.create({ userId, title, content });
      return res.json({ note });
    }
    if(req.method === 'GET'){
      const notes = await Note.find({ userId }).sort({ createdAt: -1 });
      return res.json({ notes });
    }
    return res.status(405).end();
  }catch(err){
    return res.status(401).json({ error: err.message || 'Unauthorized' });
  }
}
