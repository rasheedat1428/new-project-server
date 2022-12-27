import express from 'express';
import { 
    
    getAllProfiles,
    getProfile,
    loginUser, 
    registerUser } from '../controller/userController.js';
import { authenticate } from '../middleware/authService.js';

const userRoute = express.Router(); 

userRoute
.post("/register", registerUser)
.post("/login", loginUser);

userRoute
.get("/profile", authenticate, getProfile)
.get("/", authenticate, getAllProfiles);

export default userRoute;
