import express from 'express'
import { jwtAuthentication } from '../middleware/middleware.js'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../Controllers/companyController.js'

const router = express.Router()


router.route("/register").post(jwtAuthentication,registerCompany)
router.route("/get").get(jwtAuthentication,getCompany)
router.route("/get/:id").get(jwtAuthentication,getCompanyById)
router.route("/update/:id").put(jwtAuthentication,updateCompany)
export default router 