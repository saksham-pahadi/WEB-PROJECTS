import mongoose from 'mongoose';
const NoteSchema = new mongoose.Schema({
  email: String,
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models?.Note || mongoose.model('Note', NoteSchema);
