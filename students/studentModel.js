import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  date: [Date],
  gradeReference: [Number],
});

const Student = mongoose.model('Student', studentSchema);

export default Student;