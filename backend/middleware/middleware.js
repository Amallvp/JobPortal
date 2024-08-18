import jwt from "jsonwebtoken";

export const jwtAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
