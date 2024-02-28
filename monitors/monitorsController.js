import Monitor from './monitorModel.js';
import Student from '../students/studentModel.js';
import { ObjectId } from 'mongodb';

export function createMonitor(req,res) {
  const {name, gradeReference} = req.body;
  const monitor = new Monitor({name, gradeReference });

  monitor.save()
    .then(() => {

      res.status(201).json({ message: 'Monitor cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao cadastrar o monitor: ' + error });
    });
}

export function getAllMonitors(req, res) {
  Monitor.find()
    .then((monitors) => {
      res.json(monitors);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao buscar os monitores' });
    });
}

export async function checkMonitorAvailability(gradeReference) {
  try {
    const monitors = await Monitor.find();

    for (const timeSlot of gradeReference) {
      let verifier = false;

      for (const monitor of monitors) {
        if (monitor.gradeReference.includes(timeSlot)) {
          verifier = true;
          break;
        }
      }

      if (!verifier || monitors.length == 0) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erro ao verificar disponibilidade do monitor:', error);
    return false;
  }
}


export async function removeMonitor(req,res){
  try {
    const students = await Student.find();
    const monitor = await Monitor.findOne({_id: req.body._id})

    for (const student of students){
      for (const grade of monitor.gradeReference){
        if(student.gradeReference[0] === monitor.gradeReference[0]){
          res.status(200).json({ message: 'Não foi possivel remover o monitor pois existem alunos registrados em algum de seus horários. Se ainda desejar remove-lo, remova primeiro o(s) alunos do horário'});
          return
        }
      }
    }

    const query = { _id: new ObjectId(req.body._id) };
    await Monitor.deleteOne(query);
    res.status(200).json({ message: 'Monitor removido com sucesso' });
  } catch (error) {
      res.status(500).json({ error: 'Erro ao remover monitor: ' + error });
  }
}