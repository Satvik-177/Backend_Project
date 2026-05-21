import express from "express"
import { getMeController, logoutUserController, userRegisterController } from "../controllers/auth.controller.js";
import { loginUserController } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

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

/** 
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in the blacklist
 * @access Public
 */

authRoute.get("/logout",logoutUserController)

/** 
 * @route GET /api/auth/get-me
 * @description get the current loggedin user details
 * @access Private
 */

authRoute.get("/get-me",authUser,getMeController)


export default authRoute;