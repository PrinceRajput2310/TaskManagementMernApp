import TodoList from "../models/todoModels.js";

export const addTodo = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.send({ Message: "Please enter todo title and content" });
  } else {
    try {
      req.body.user = req.user.id;
      const newTodo = new TodoList(req.body);
      await newTodo.save();
      return res
        .status(200)
        .send({ message: "Todo Added successfully", newTodo });
    } catch (error) {
      return res.status(404).send({ message: `Error adding Todo ${error}` });
    }
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const populatedTodos = await TodoList.find({ user: req.user.id }).populate(
      "user",
      "name email"
    );

    return res.json({
      success: true,
      totalTask: populatedTodos.length,
      populatedTodos,
    });
  } catch (error) {
    res.status(404).send({ message: "Error getting all TodoList" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.send({ message: "Todo id is missing " });
  }
  try {
    const deletedTodo = await TodoList.findByIdAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({
      message: "Todo deleted successfully",
      todo: await TodoList.find({}),
    });
  } catch (error) {
    return res.send({ message: "Error during deleting todo" });
  }
};

export const searchTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(404).send({ message: "Please Enter Query String" });
  }
  try {
    // Use a regular expression to perform a partial match search
    const searchResult = await TodoList.find({
      title: { $regex: title, $options: "i" },
      user: req.user.id,
    });

    if (!searchResult || searchResult.length === 0) {
      return res.status(404).send({ message: "Result not found" });
    }

    return res.status(200).send({
      message: "Todo(s) found successfully",
      data: searchResult,
    });
  } catch (error) {
    return res.status(404).send({ message: "Error found during search" });
  }
};

// update todo list

export const updateTodo = async (req, res) => {
  try {
    const { id, title, content, status, priority } = req.body;
    const todo = await TodoList.findOneAndUpdate(
      { _id: id },
      {
        title,
        content,
        status,
        priority,
        user: req.user.id,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    res.status(201).json({
      message: `found error during update ${error}`,
    });
  }
};

// get Task by category like, Pending, completed

export const getTaskByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const userId = req.user.id;
    const task = await TodoList.find({
      status: category,
      user: userId,
    });

    return res.status(200).json({
      success: true,
      totalTask: task.length,
      task,
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Error found while filter task by category",
    });
  }
};

// get Total Task like, total task, pendingTask and Completed Task
export const getTotalTask = async (req, res) => {
  try {
    const totalTask = await TodoList.find({
      user: req.user.id,
    });
    const pendingTask = await TodoList.find({
      status: "Pending",
      user: req.user.id,
    });
    const completedTask = await TodoList.find({
      status: "Completed",
      user: req.user.id,
    });
    return res.status(200).json({
      success: true,
      totalTask: totalTask.length,
      pendingTask: pendingTask.length,
      completedTask: completedTask.length,
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Error getting Total Task",
    });
  }
};

// task analytics

export const taskAnalytics = async (req, res) => {
  try {
    const task = await TodoList.find({});

    // Initialize counters for pending and completed tasks
    let pendingTaskCount = 0;
    let completedTaskCount = 0;

    // Iterate through tasks and count pending and completed ones
    task.forEach((task) => {
      if (task.status === "Pending") {
        pendingTaskCount++;
      } else if (task.status === "Completed") {
        completedTaskCount++;
      }
    });

    const pendingTaskPercentage = Math.floor(
      (pendingTaskCount / task.length) * 100
    );

    const completedTaskPercentage = Math.floor(
      (completedTaskCount / task.length) * 100
    );

    return res.status(200).json({
      success: true,
      totalTaskCount: task.length,
      pendingTaskCount,
      completedTaskCount,
      pendingTaskPercentage,
      completedTaskPercentage,
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Error during task analytics data",
    });
  }
};
