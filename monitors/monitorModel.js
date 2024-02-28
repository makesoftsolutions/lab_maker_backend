import mongoose from 'mongoose';

const monitorSchema = new mongoose.Schema({
  name: String,
  gradeReference: [Number]
});

const Monitor = mongoose.model('Monitor', monitorSchema);

export default Monitor;
