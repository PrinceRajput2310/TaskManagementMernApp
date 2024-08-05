import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import { Input, Button } from "antd";
import DisplayTask from "./DisplayTask";
import { Select } from "antd";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskRequest,
  newTaskRequest,
  searchTaskRequest,
  pendingTaskRequest,
  completedTaskRequest,
  allTaskRequest,
} from "../redux/reduxSlice/taskSlice";

const { TextArea } = Input;

const Home = () => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [activeTab, setActiveTab] = useState("alltask");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.task);
  const pendingTask = useSelector((state) => state.task);
  const completedTask = useSelector((state) => state.task);
  const searchTask = useSelector((state) => state.task);
  const taskDetail = useSelector((state) => state.task.allTask);

  console.log("task detail", taskDetail);
  const allTask = searchByTitle
    ? searchTask.searchTask.data
    : data.populatedTodos;

  useEffect(() => {
    dispatch(fetchTaskRequest());
    dispatch(allTaskRequest());
    if (activeTab === "alltask") {
      dispatch(fetchTaskRequest());
    }
    if (activeTab === "pendingtask") {
      dispatch(pendingTaskRequest());
    }
    if (activeTab === "completedtask") {
      dispatch(completedTaskRequest());
    }
  }, [dispatch, activeTab]);

  const searchTodo = async (value) => {
    setSearchByTitle(value);
    if (value) {
      dispatch(searchTaskRequest({ value }));
    } else {
      dispatch(fetchTaskRequest());
    }
  };

  const addTodo = () => {
    dispatch(newTaskRequest({ title, todo, taskStatus, taskPriority }));
    setTodo("");
    setTitle("");
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "alltask":
        return <DisplayTask todos={allTask} />;

      case "pendingtask":
        return <DisplayTask todos={pendingTask.pending.task} />;

      case "completedtask":
        return <DisplayTask todos={completedTask.completed.task} />;

      default:
        return <DisplayTask todos={data.populatedTodos} />;
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
          <IoMdAdd size={20} /> Add Task
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
            All Task ({taskDetail.totalTask})
          </div>
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
                activeTab === "pendingtask" ? "2px solid tomato" : "",
            }}
            onClick={() => setActiveTab("pendingtask")}
          >
            Pending Task ({taskDetail.pendingTask})
          </div>
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
            Completed Task ({taskDetail.completedTask})
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
