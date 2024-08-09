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
          from: "todos",
          localField: "_id",
          foreignField: "user",
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

// user Analytics

export const userAnalytics = async (req, res) => {
  try {
    const analytics = req.query.userAnalytics;
    if (analytics === "bargraph") {
      const users = await User.find({});
      const groupedUsers = users.reduce((acc, user) => {
        const date = new Date(user.createdAt);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}/${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}/${date.getFullYear()}`;
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(user);
        return acc;
      }, {});

      // Prepare the result to display user count for each date
      const result = [];
      for (const [date, users] of Object.entries(groupedUsers)) {
        result.push({
          date,
          user: users.length,
        });
      }
      res.json({ success: true, result });
    } else {
      return res.status(201).json({
        success: false,
        message: "Query String is missing",
      });
    }
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Error during fetch user Analytics",
    });
  }
};

export const getYourScoreData = async (req, res) => {
  try {
    const userId = req.user.id;
    const allUsers = await User.find({});

    let userRanges = {
      "0-20%": 0,
      "20-40%": 0,
      "40-60%": 0,
      "60-80%": 0,
      "80-100%": 0,
    };

    let currentUserCompletionPercentage = 0;

    for (let user of allUsers) {
      const userTasks = await TodoList.find({ user: user._id });

      const totalTasks = userTasks.length;
      const completedTasks = userTasks.filter(
        (task) => task.status === "Completed"
      ).length;

      const completionPercentage =
        totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

      if (user._id.toString() === userId) {
        currentUserCompletionPercentage = Math.floor(completionPercentage);
      }

      // Categorize the user into the correct range
      if (completionPercentage <= 20) userRanges["0-20%"]++;
      else if (completionPercentage <= 40) userRanges["20-40%"]++;
      else if (completionPercentage <= 60) userRanges["40-60%"]++;
      else if (completionPercentage <= 80) userRanges["60-80%"]++;
      else userRanges["80-100%"]++;
    }

    // Prepare the response data
    const result = [
      { range: "0-20%", user: userRanges["0-20%"] },
      { range: "20-40%", user: userRanges["20-40%"] },
      { range: "40-60%", user: userRanges["40-60%"] },
      { range: "60-80%", user: userRanges["60-80%"] },
      { range: "80-100%", user: userRanges["80-100%"] },
    ];

    // Send response
    res.status(200).json({
      success: true,
      result,
      currentUserCompletionPercentage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user score data" });
  }
};
