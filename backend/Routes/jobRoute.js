import express from "express";
import { jwtAuthentication } from "../middleware/middleware.js";
import { getAllJob, getJobById, getJobPostedByAdmin, postJob } from "../Controllers/job.controller.js";

const router = express.Router()

router.route("/jobs").get(jwtAuthentication,getAllJob)
router.route("/jobs/:id").get(jwtAuthentication,getJobById)
router.route("/post/jobs").post(jwtAuthentication,postJob)
router.route("/admin/jobs").get(jwtAuthentication,getJobPostedByAdmin)

export default router 