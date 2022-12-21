import asyncHandler from "express-async-handler";
import { 
    getUserProfileService, 
    registerUserService, 
    getAllUsersProfileService,
    loginUserService } from "../service/userService.js";

export const registerUser = asyncHandler(async (req, res) => {
const {name, username, password} = req.body;

if (!name ||!username ||!password) {
    res.status(400);
    throw new Error('name, username, and password are required');
};

const anyUser = await getUserProfileService(username);
if (anyUser) {
    res.status(400);
    throw new Error(`user ${username} already exist`);
};

const savedUser = await registerUserService(req.body);
return res.status(200).json({
    id: savedUser.id,
    name: savedUser.name,
    role: savedUser.role,
    username: savedUser.username,
    createdAt: savedUser.createdAt,
    updatedAt: savedUser.updatedAt,
});
});

export const loginUser = asyncHandler(async (req, res) => {
const {username, password} = req.body;
if (!username ||!password) {
    res.status(400);
    throw new Error('username and password are required');
}
const user = await loginUserService(username, password);
    if (!user) {
        res.status(401);
        throw new Error(`Unauthorized: invalid username or password`);
    }
    return res.status(200).json({
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,  
    })
})
