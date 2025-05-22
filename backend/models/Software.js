import mongoose from 'mongoose';

const softwareSchema = new mongoose.Schema({
  name: String,
  description: String,
  accessLevels: [String]
});

const Software = mongoose.model('Software', softwareSchema);
export default Software;
