import express, { json } from "express";
import StudentModel from "./model/student.js";
import mongoose, {Schema} from "mongoose";
import  * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 6000;
const MONGODB_URL = process.env.MONGODB_URL


  app.get("/students", async(req, res) => {
    const allStudents = await StudentModel.find();
    res.json(allStudents)});

  app.get("/students/:id", async(req, res) => {
    const studentsId = req.params.id;
    const foundStudent = await StudentModel.findById(studentsId);
  if (foundStudent) {
    return res.status(200).json(foundStudent)
  } else {
     return res.status(404).json({message: "Student not found"}) 
  }
  });

  app.post("/students", async(req, res) => {
    const body = req.body;
    const newStudentList = await StudentModel.create(body);
    return res.status(201).json(newStudentList);
  });

  app.put("/students/:id", async(req, res) => {
    const studentId = req.params.id;
    const foundStudent = await StudentModel.findById(studentId);
    if (foundStudent) {
      const body = req.body;
      const payload = {name: body.name, email: body.email};
      const updateStudent = await StudentModel.findByIdAndUpdate(
        studentId,
        payload,
        {returnDocument: "after"}
      );
      return res.status(200).json(updateStudent);
    } else {
      return res.status(400).json({message: "Student not Found"})
    }
    });
    
   app.delete("/students/:id", async(req, res) => {
    const studentId = req.params.id;
    const deleteStudent = await StudentModel.findByIdAndDelete(studentId)
    return res.status(200).send("Student Deleted");
   });
   
mongoose
   .connect(MONGODB_URL)
   .then((con) => 
      console.log(`Connected to MongoDb cluster via ${con.connection.host}`))

  .catch((err) => 
    console.error(`Unable to connect to mongoDb cluster ${err.message}`));
  
  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
