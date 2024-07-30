import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { API_URL } from "../utils/apiEndPoints";
import Header from "./Header";
import { Input, Button } from "antd";
import DisplayTask from "./DisplayTask";

const { TextArea } = Input;

const Home = () => {
  const [todos, setAllTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [activeTab, setActiveTab] = useState("alltask");
  const [task, setTask] = useState("");

  useEffect(() => {
    getAllTask();
    if (activeTab === "alltask") {
      getAllTodos();
    }
    if (activeTab === "pendingtask") {
      getPendingTaskList();
    }
    if (activeTab === "completedtask") {
      getCompletedTaskList();
    }
  }, [activeTab]);

  const searchTodo = async (value) => {
    setSearchByTitle(value);
    if (value) {
      try {
        const response = await axios.post(
          `${API_URL}/search`,
          {
            title: value,
          },
          {
            withCredentials: true,
          }
        );
        const filterData = response.data.data;
        setAllTodos(filterData);
        console.log("Searched result", filterData);
      } catch (error) {
        console.log("Error during search:", error);
      }
    } else {
      getAllTodos();
    }
  };

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/alltodo`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAllTodos(response.data.populatedTodos);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/new`,
        {
          title,
          content: todo,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Todo added successfully", response.data);
      getAllTodos();
      setTitle("");
      setTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const getPendingTaskList = async () => {
    try {
      const pendingtask = await axios.get(
        `${API_URL}/category?category=Pending`,
        {
          withCredentials: true,
        }
      );
      const task = await pendingtask.data.task;
      setAllTodos(task);

      console.log("Pending task", task);
    } catch (error) {
      console.log("Error fetching Pending task", error);
    }
  };

  const getCompletedTaskList = async () => {
    try {
      const pendingtask = await axios.get(
        `${API_URL}/category?category=Completed`,
        {
          withCredentials: true,
        }
      );
      const task = await pendingtask.data.task;
      setAllTodos(task);

      console.log("Pending task", task);
    } catch (error) {
      console.log("Error fetching Completed task", error);
    }
  };

  const getAllTask = async () => {
    try {
      const alltask = await axios.get(`${API_URL}/taskdetail`, {
        withCredentials: true,
      });
      const task = await alltask.data;
      setTask(task);
      console.log("Get All Task", task);
    } catch (error) {
      console.log("Error fetching Completed task", error);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "alltask":
        return <DisplayTask todos={todos} getAllTodos={getAllTodos} />;

      case "pendingtask":
        return <DisplayTask todos={todos} getAllTodos={getAllTodos} />;

      case "completedtask":
        return <DisplayTask todos={todos} getAllTodos={getAllTodos} />;

      default:
        return <DisplayTask todos={todos} getAllTodos={getAllTodos} />;
    }
  };

  return (
    <>
      <Header />
      <div
        className="add-todo-container"
        style={{
          marginTop: "30px",
          alignItems: "center",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "500px",
          gap: "15px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Input
          style={{ height: "58px" }}
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          style={{ height: "120px" }}
          placeholder="Enter Task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button
          type="button"
          onClick={addTodo}
          style={{
            maxWidth: "180px",
            outline: "none",
            background: "none",
            fontSize: "16px",
            padding: "15px",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Add Task
        </Button>
      </div>
      <div
        style={{
          // backgroundColor: "tomato",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <div style={{ fontSize: "24px", fontFamily: "500" }}>
          <Button
            type="button"
            style={{
              maxWidth: "180px",
              outline: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "500",
              color: "black",
            }}
            onClick={() => setActiveTab("alltask")}
          >
            All Task ({task.totalTask})
          </Button>
          <Button
            type="button"
            style={{
              maxWidth: "180px",
              outline: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "500",
              color: "black",
            }}
            onClick={() => setActiveTab("pendingtask")}
          >
            Pending Task ({task.pendingTask})
          </Button>
          <Button
            type="button"
            style={{
              maxWidth: "180px",
              outline: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "500",
              color: "black",
            }}
            onClick={() => setActiveTab("completedtask")}
          >
            Completed Task ({task.completedTask})
          </Button>
        </div>

        <div
          style={{
            maxWidth: "500px",
          }}
        >
          <Form.Control
            type="search"
            value={searchByTitle}
            onChange={(e) => searchTodo(e.target.value)}
            placeholder="Search task by title name"
            className="me-2"
            aria-label="Search"
          />
        </div>
      </div>
      <div className="displayActiveTabContentContainer">
        {renderActiveTabContent()}
      </div>
    </>
  );
};

export default Home;
