import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("wrong header fromat ");
    return res.status(401).json({
      message: "Please Login to access this resource,token not found",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// export const isAuthenticatedUser = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Please Login to access this resource" });
//   }

//   const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//   req.user = await User.findById(decodedData.id);

//   next();
// };
