import asyncHandler from "express-async-handler";
import { generateToken } from "../middleware/authService.js";
import {
  getUserProfileService,
  registerUserService,
  getAllUsersProfileService,
  loginUserService,
} from "../service/userService.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    res.status(400);
    throw new Error("name, username, and password are required");
  }

  const anyUser = await getUserProfileService(username);
  if (anyUser) {
    res.status(400);
    throw new Error(`user ${username} already exist`);
  }

  const savedUser = await registerUserService(req.body);
  const token = await generateToken({
    id: savedUser.id,
    username: savedUser.username,
    role: savedUser.role,
  });
  return res.status(200).json({
    id: savedUser.id,
    name: savedUser.name,
    role: savedUser.role,
    username: savedUser.username,
    createdAt: savedUser.createdAt,
    updatedAt: savedUser.updatedAt,
    token,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("username and password are required");
  }
  const user = await loginUserService(username, password);
  if (!user) {
    res.status(401);
    throw new Error(`Unauthorized: invalid username or password`);
  }
  const token = await generateToken({
    id: user.id,
    username: user.username,
    role: user.role,
  });
  return res.status(200).json({
    id: user.id,
    name: user.name,
    role: user.role,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token,
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const payload = req.payload;
  if (payload) {
    const username = payload.username;
    const user = await getUserProfileService(username);

    if (user) {
      return res.status(200).json(generatePayload(user));
    }
  }
  res.status(401);
  throw new Error("User is unauthorized");
});

export const getAllProfiles = asyncHandler(async (req, res) => {
  const payload = req.payload;
  if (payload) {
    const username = payload.username;
    const user = await getUserProfileService(username);

    if (user && user.role === "admin") {
      const allUsers = await getAllUsersProfileService();
      return res
        .status(200)
        .json(allUsers.map((user) => generatePayload(user)));
    } else {
      res.status(403);
      throw new Error("user is forbidden to access this resource");
    }
  }
  res.status(401);
  throw new Error("user is unauthorized or authenticated");
});

const generatePayload = (user) => ({
  id: user.id,
  name: user.name,
  role: user.role,
  username: user.username,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
