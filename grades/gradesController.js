import Grade from './gradeModel.js';
import Monitor from '../monitors/monitorModel.js';

export function createGrade(req,res) {

  Grade.insertMany(req.body.Grade)
    .then(() =>{
      res.status(201).json({ message: 'Grade cadastrada com sucesso!' });

    }).catch((error) => {
      res.status(500).json({ error: 'Erro ao cadastrar a grade: ' + error });
    });
}

export function getAllGrades(req, res) {
  Grade.find()
    .then((grades) => {
      res.json(grades);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao buscar as grades' });
    });
}

export async function getFilteredGrades(req, res) {
  try {
    const monitors = await Monitor.find();
    const gradesWithMonitors = [];
    const grades = await Grade.find();

    for (const grade of grades) {
        let timeSlot = grade._id
        for (const monitor of monitors) {
          if (monitor.gradeReference.includes(timeSlot) && monitor.status === "active") {
            gradesWithMonitors.push(grade);
            break;
          }
        }
    }

    res.json(gradesWithMonitors);
  } catch (error) {
    console.error('Erro ao buscar as grades com monitores:', error);
    res.status(500).json({ error: 'Erro ao buscar as grades com monitores' });
  }
}

export async function removeGrade(req,res){
  try {

    const monitors = await Monitor.find();

    for (const monitor of monitors){
      for (const grade of monitor.gradeReference){
        if(grade === req.body._id){
          res.status(200).json({ message: 'Não foi possivel remover o horário pois existem monitores registrados nele. Se ainda desejar remove-lo, remova primeiro o(s) monitores do horário'});
          return
        }
      }
    }

    const query = { _id: req.body._id };
    await Grade.deleteOne(query);
    res.status(200).json({ message: 'Item da grade removido com sucesso' });
  } catch (error) {
      res.status(500).json({ error: 'Erro ao remover item da grade: ' + error });
  }
}