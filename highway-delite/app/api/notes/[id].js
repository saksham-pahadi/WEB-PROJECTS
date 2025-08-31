import dbConnect from '../../../../lib/db';
import Note from '../../../../models/Note';
import jwt from 'jsonwebtoken';

export default async function handler(req,res){
  await dbConnect();
  try{
    const token = req.cookies?.token || (req.headers.authorization||'').split(' ')[1];
    if(!token) throw new Error('Unauthenticated');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const noteId = req.query.id;
    if(req.method === 'DELETE'){
      const note = await Note.findOneAndDelete({ _id: noteId, userId: payload.userId });
      if(!note) return res.status(404).json({ error:'Not found or not your note' });
      return res.json({ ok:true });
    }
    return res.status(405).end();
  }catch(err){
    return res.status(401).json({ error: err.message || 'Unauthorized' });
  }
}
