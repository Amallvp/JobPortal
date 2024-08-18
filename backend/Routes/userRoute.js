import express from 'express'
import { login, logout, register, updateProfile } from '../Controllers/userController.js' 
import { jwtAuthentication } from '../middleware/middleware.js'

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").put(jwtAuthentication,updateProfile)



export default router 