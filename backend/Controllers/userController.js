import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role } = req.body;

    if (!username || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "Provide valid credentials" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    return res.status(200).json({ message: "Account Created Successfully" });
  } catch (error) {
    console.error({ message: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Provide Valid Credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Provided mail id or password is wrong" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ message: "Provided mail id or password is wrong" });
    }

    if (role !== user.role) {
      return res
        .status(400)
        .json({ message: "Account doesn't exist of current role" });
    }

    const jwtData = {
      userId: user._id,
    };

    const token = jwt.sign(jwtData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({ message: "Login Successfull", user, token });
  } catch (error) {
    console.error({ message: error });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.error({ message: error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // cloudinary

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware authentication

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skillsArray = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.profile.bio,
      skillsArray: user.profile.skillsArray,
    };

    return res.status(200).json({ message: "Profile updated Successfull",user });
  } catch (error) {}
};
