import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role } = req.body;

    if (!username || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "Please provide valid credentials" });
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
  } catch (error) {
    console.error({ message: error });
  }
};
