import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  _id: Number,
  description: String

});

const Grade = mongoose.model('grade', gradeSchema);

export default Grade;
