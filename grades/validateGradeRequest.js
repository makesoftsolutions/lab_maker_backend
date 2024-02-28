import { createGrade } from "./gradesController.js";

export default function validateGradeRequest(request,response){
    createGrade(request,response);
}