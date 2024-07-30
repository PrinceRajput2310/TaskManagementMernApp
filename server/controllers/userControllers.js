import User from "../models/userModel.js";
import { sendToken } from "../utils/sendToken.js";
import TodoList from "../models/todoModels.js";

export const registerPerson = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.send("Please enter email and password");
  } else {
    try {
      const user = await User.create({ name, email, password });
      // await newPerson.save();

      sendToken(user, 201, res);
    } catch (error) {
      console.error("error during register", error);
    }
  }
};
// Endpoint to allow login

export const loginPerson = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(201).json({ message: "Invalid Email and Password" });
  }
  const isPasswordMatch = await user.comparePassword(password);
  // const token = user.getJWTToken();
  console.log("password match value", isPasswordMatch);
  if (!isPasswordMatch) {
    return res.send({ message: "Invalid Email and Password" });
  } else {
    sendToken(user, 200, res);
  }
};

//  endpoint to get all registered persons
export const getAllPersons = async (req, res) => {
  try {
    const usersWithTodos = await User.aggregate([
      {
        $lookup: {
          from: "todos", // Make sure this matches the collection name for your TodoList model
          localField: "_id",
          foreignField: "user", // Assuming that `userId` in TodoList refers to the user
          as: "todos",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          todoCount: { $size: "$todos" },
        },
      },
    ]);

    return res.status(200).json({
      message: "All Users and their todo counts",
      users: usersWithTodos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error retrieving persons");
  }
};
// export const getAllPersons = async (req, res) => {
//   try {
//     const user = await User.find({});
//     return res.status(200).json({
//       message: "All Users",
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Error retrieving persons");
//   }
// };

//get Single user Details

export const getSingleUserDetail = async (req, res) => {
  const { id } = req.body;

  const user = await User.findById({ _id: id });
  if (!user) {
    return res.status(201).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "user found successfully",
    user,
  });
};

//logout user
export const logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
