import express, { json } from "express";
import  * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 6000;

const students = [
    { id: 1, name: "Habeeb", email: "habeeb@habeeb.com" },
    { id: 2, name: "Rasheedat", email: "rasheedat@habeeb.com" },
    { id: 3, name: "Lateef", email: "rasheedat@habeeb.com" },
    { id: 4, name: "Motunrayo", email: "rasheedat@habeeb.com" },
  ];

  app.get("/students", (req, res) => res.json(students));
  app.get("/students/:id", (req, res) => {
    const studentsId = req.params.id;
    const student = students.find((s) => s.id.toString() === studentsId);
  
  if (student) {
    return res.status(200).json(student)
  } else {
     return res.status(404).json({message: "Student not found"}) 
  }
  });

  app.post("/students", (req, res) => {
    const body = req.body;
    const newStudentList = [...students, body];
    return res.status(201).json(newStudentList);
  });

  app.put("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const student = students.find((s) => s.id.toString() === studentId);
    if (student) {
      const body = req.body;
      const updateStudent = students.filter((f) => f.id.toString() !== studentId)
      return res.status(200).json([...updateStudent, body]);
    } else {
      return res.status(400).json({message: "Student not Found"})
    }
    });
    
   app.delete("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const deleteStudent = students.filter((f) => f.id.toString() !== studentId);
    return res.status(200).json(deleteStudent);
   });
   
  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
