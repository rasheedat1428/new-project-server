import express from "express";
import { 
    addStudent, 
    editStudent, 
    findAllStudent, 
    findStudentById, 
    removeStudent } from "../controller/studentController.js";
 
const studentRoute = express.Router();

studentRoute.route("/").get(findAllStudent).post(addStudent);
studentRoute.route("/:id").put(editStudent).get(findStudentById).delete(removeStudent)

export default studentRoute;