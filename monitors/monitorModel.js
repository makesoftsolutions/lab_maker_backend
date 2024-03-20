import mongoose from 'mongoose';

const monitorSchema = new mongoose.Schema({
  name: String,
  gradeReference: {type: [Number]},
  validator: {type:String, unique:true},
  status: { type: String, default: "active"}
});

const Monitor = mongoose.model('Monitor', monitorSchema);

export default Monitor;
