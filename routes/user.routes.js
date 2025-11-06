import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const routesOfUsers = Router();

routesOfUsers.post("/register", UserController.registerUser);
routesOfUsers.post("/login", UserController.loginUser);