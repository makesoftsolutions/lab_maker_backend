import Student from './studentModel.js';

export function createStudent(req, res) {
  const { name, date, gradeReference } = req.body;

  const student = new Student({
    name,
    date,
    gradeReference,
  });

  student.save()
    .then(() => {
      res.status(201).json({ message: 'Aluno cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao cadastrar o aluno: ' + error });
    });
}

export function getAllStudents(req, res) {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Erro ao buscar os alunos:", error);
      res.status(500).json({ error: 'Erro ao buscar os alunos' });
    });
}


export async function countStudents(dates,gradeReference){
  try{
    const students = await Student.find()

      for (const date of dates){
        let counter = 0

        for (const student of students){

          for (const student_date of student.date){
            if (student_date.getTime() == new Date(date).getTime() && student.gradeReference[0] == gradeReference[0]){
              counter++
            }
          }
        }

        if (counter >= 8){
          return false
        }
      }

    return true
  }
  catch(error){
    return false
  }
}
