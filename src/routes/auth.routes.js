import express from "express"
import { userRegisterController } from "../controllers/auth.controller.js";
import { loginUserController } from "../controllers/auth.controller.js";

const authRoute = express.Router()

/** 
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRoute.post("/register",userRegisterController)

/** 
 * @route POST /api/auth/login
 * @description login the existing user
 * @access Public
 */

authRoute.post("/login",loginUserController)

export default authRoute;