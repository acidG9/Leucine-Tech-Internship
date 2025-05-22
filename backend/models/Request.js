import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  software: { type: mongoose.Schema.Types.ObjectId, ref: 'Software' },
  accessType: { type: String, enum: ['Read', 'Write', 'Admin'] },
  reason: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

const Request = mongoose.model('Request', requestSchema);
export default Request;
