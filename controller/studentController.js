import { errorResponse } from "../errors/errorTypes.js";
import { 
    deleteStudent, 
    getAllStudent, 
    getStudentById, 
    saveStudent, 
    updateStudent } from "../service/studentService.js";

const checkStudentById = async(studentId) => {
    return await getStudentById(studentId)
};

export const findStudentById = async(req, res, next) => {
    try {
    const studentId = req.params.id;
    const response = await checkStudentById(studentId);
    if (response) return res.status(200).json(response);
    else {
        res.status(404);
        throw new Error(`Student not found of id: ${studentId}`);
    }
} catch (err) {
    res.status(500);
    next(err);
}
};

export const findAllStudent = async(req, res) => {
    const response = await getAllStudent();
    return res.status(200).json(response)
};

export const addStudent = async(req, res) => {
    const body = req.body;
    const response = await saveStudent(body);
    return res.status(201).json(response)
};

export const editStudent = async(req, res) => {
    const studentId = req.params.id;
    const response = await checkStudentById(studentId)

    if (response) {
    const body = req.body;
    const payload = {name: body.name, email: body.email};
    const resp = await updateStudent(studentId, payload);
    return res.status(200).json(resp)
    } else {
        return res.status(400).json({message: "Student not Found"})
    };
};

export const removeStudent = async(req, res) => {
const studentId = req.params.id;
const response = await checkStudentById(studentId)
if (response) {
    await deleteStudent(studentId)
    return res.status(200).send("Deleted Successfully")
} else {
    return res.status(400).send("Student not Found")
}
};