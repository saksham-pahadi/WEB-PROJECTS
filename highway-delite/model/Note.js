import mongoose from 'mongoose';
const NoteSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
