import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  _id: Number,
  description: {type: String, unique:true}

});

const Grade = mongoose.model('grade', gradeSchema);

export default Grade;
