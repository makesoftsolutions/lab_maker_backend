import { createMonitor } from "./monitorsController.js";
import Grade from '../grades/gradeModel.js'

export  default async function validateMonitorRequest(request,response){

    const grades = await Grade.find()

    for (const monitorGrade of request.body.gradeReference){
        
        let validated = false

        for (const grade of grades){
            if (monitorGrade == grade._id){
                validated = true
                continue
            }
        }

        if (!validated){
            response.status(400).json({ error: 'Um ou mais horários do monitor não estão na grade' });
            return
        }
}

    createMonitor(request,response)
}
