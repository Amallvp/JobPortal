import jwt from "jsonwebtoken";
import { Job } from "../Models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      jobTitle,
      position,
      company,
    } = req.body;

    const userId = req.userId;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobTitle ||
      !position ||
      !company ||
      !createdBy ||
      !appilcation
    ) {
      return res.status(400).json({ message: "Provide valid Creddentials" });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.spit(","),
      salary,
      location,
      experience,
      jobTitle,
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
