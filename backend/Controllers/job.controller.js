import jwt from "jsonwebtoken";
import { Job } from "../Models/jobModel.js";

// student searching for job

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { descriptions: { $regex: keyword, $options: "i" } },
      ],
    };

    const AllJobs = await Job.find(query);

    if (!AllJobs) {
      return res.status(404).json({
        message: "Jobs not found",
      });
    }
    return res.status(200).json({ AllJobs });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const getJob = await Job.findById(jobId);

    if (!getJob) {
      return res.status(400).json({ message: "No job found" });
    }

    return res.status(200).json({ getJob });
  } catch (error) {}
};

// admin or recruiter posting the job

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      jobType,
      position,
      company,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobType ||
      !position ||
      !company
    ) {
      return res.status(400).json({ message: "Provide valid Credentials" });
    }

    const job = await Job.create({
      title,
      description,
      requirements:requirements.split(","),
      salary,
      location,
      experience,
      jobType,
      position,
      company,
      createdBy: userId,
    });
    return res
      .status(200)
      .json({ message: "New Job Created successfully", job });
  } catch (error) {
    console.log(error);
  }
};

export const getJobPostedByAdmin = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ createdBy: adminId });

    if (!jobs) {
      return res.status(400).json({ message: "No job found" });
    }
    return res.status(200).json({ jobs });
  } catch (error) {}
};
