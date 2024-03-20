import Student from './studentModel.js';
import cron from 'node-cron';

export default async function removeOldStudents() {
  try {

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const query = { 'date.0': { $lt: yesterday } };

    await Student.deleteMany(query);

    console.log('Registros antigos removidos com sucesso.');
  } catch (error) {
    console.error('Erro ao remover registros antigos:', error);
  }
}

cron.schedule('0 0 * * *', removeOldStudents);

removeOldStudents();
