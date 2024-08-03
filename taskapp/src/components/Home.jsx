import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { API_URL } from "../utils/apiEndPoints";
import Header from "./Header";
import { Input, Button } from "antd";
import DisplayTask from "./DisplayTask";
import { Select } from "antd";
// import Cookies from "js-cookie";
// import { LOCALHOST_BACKEND_URL } from "../utils/apiEndPoints";

const { TextArea } = Input;

const Home = () => {
  const [todos, setAllTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [activeTab, setActiveTab] = useState("alltask");
  const [task, setTask] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

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
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/api/v1/todo/search`,
          {
            title: value,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
      const token = localStorage.getItem("token");
      console.log("token-------", token);
      const response = await axios.get(`${API_URL}/api/v1/todo/alltodo`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAllTodos(response.data.populatedTodos);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/v1/todo/new`,
        {
          title,
          content: todo,
          status: taskStatus,
          priority: taskPriority,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("token");
      const pendingtask = await axios.get(
        `${API_URL}/api/v1/todo/category?category=Pending`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
      const token = localStorage.getItem("token");
      const pendingtask = await axios.get(
        `${API_URL}/api/v1/todo/category?category=Completed`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
      const token = localStorage.getItem("token");
      const alltask = await axios.get(`${API_URL}/api/v1/todo/taskdetail`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  const onChange = (value) => {
    setTaskStatus(value);
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onChangePriority = (value) => {
    setTaskPriority(value);
    console.log(`selected ${value}`);
  };
  const onSearchPriority = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <Header />
      <div
        className="add-todo-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "500px",
          gap: "15px",
          marginLeft: "auto",
          marginRight: "auto",
          // backgroundColor:'tomato',
          padding: "20px",
        }}
      >
        <div>Enter Task Title</div>
        <Input
          style={{ height: "58px" }}
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>Enter Task Content</div>
        <TextArea
          style={{ height: "120px" }}
          placeholder="Enter Task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Select
          style={{ height: "58px" }}
          showSearch
          placeholder="Select task status"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            {
              value: "Completed",
              label: "Completed",
            },
            {
              value: "Pending",
              label: "Pending",
            },
          ]}
        />

        <Select
          style={{ height: "58px" }}
          showSearch
          placeholder="Select task priority"
          optionFilterProp="label"
          onChange={onChangePriority}
          onSearch={onSearchPriority}
          options={[
            {
              value: "Normal",
              label: "Normal",
            },
            {
              value: "Medium",
              label: "Medium",
            },
            {
              value: "High",
              label: "High",
            },
          ]}
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
        <div
          style={{
            fontSize: "24px",
            fontFamily: "500",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <div
            type="button"
            style={{
              maxWidth: "180px",
              outline: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "500",
              color: "black",
              paddingBottom: "8px",
              borderBottom: activeTab === "alltask" ? "2px solid tomato" : "",
            }}
            onClick={() => setActiveTab("alltask")}
          >
            All Task ({task.totalTask})
          </div>
          <duv
            type="button"
            style={{
              maxWidth: "180px",
              outline: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "500",
              color: "black",
              paddingBottom: "8px",
              borderBottom:
                activeTab === "pendingtask" ? "2px solid tomato" : "",
            }}
            onClick={() => setActiveTab("pendingtask")}
          >
            Pending Task ({task.pendingTask})
          </duv>
          <div
            type="button"
            style={{
              maxWidth: "180px",
              outline: "none",
              background: "none",
              fontSize: "16px",
              fontWeight: "500",
              color: "black",
              paddingBottom: "8px",
              borderBottom:
                activeTab === "completedtask" ? "2px solid tomato" : "",
            }}
            onClick={() => setActiveTab("completedtask")}
          >
            Completed Task ({task.completedTask})
          </div>
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
            placeholder="Search task by title"
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
