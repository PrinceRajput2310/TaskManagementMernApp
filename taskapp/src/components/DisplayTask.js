import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apiEndPoints";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Modal, Input, Select, Spin } from "antd";

const { TextArea } = Input;

const DisplayTask = ({ todos, getAllTodos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState("");
  const [defaultStatus, setDefaultStatus] = useState("");
  const [defaultPriority, setDefaultPriority] = useState("");
  const [newStaus, setNewStatus] = useState("");
  const [newPriority, setNewPriority] = useState("");

  const showModal = (title, content, id, status, priority) => {
    setNewTitle(title);
    setNewTodo(content);
    setEditId(id);
    setDefaultPriority(priority);
    setDefaultStatus(status);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      const token = localStorage.getItem("token");
      const updateTask = await axios.put(
        `${API_URL}/api/v1/todo/update`,
        {
          id: editId,
          title: newTitle,
          content: newTodo,
          status: newStaus,
          priority: newPriority,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Todo updated successfully", updateTask.data);
      getAllTodos();
      setIsModalOpen(false);
    } catch (error) {
      console.log(`Error during updates ${error}`);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token inside delete api", token);
      const deletedTask = await axios.delete(`${API_URL}/api/v1/todo/delete`, {
        data: { id },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      getAllTodos();
      console.log("todo deleted Successfully", deletedTask.data);
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  const onChange = (value) => {
    setNewStatus(value);
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onChangePriority = (value) => {
    setNewPriority(value);
    console.log(`selected ${value}`);
  };
  const onSearchPriority = (value) => {
    console.log("search:", value);
  };
  console.log("--------", defaultPriority, defaultStatus, newTitle, newTodo);
  return (
    <>
      <div
        className="display-todo-container"
        style={{
          margin: "20px",
        }}
      >
        <Row xs={2} md={4} sm={1} className="g-4">
          {todos && todos.length === 0 ? (
            <Spin tip="Loading" size="large"></Spin>
          ) : (
            <>
              {" "}
              {todos &&
                todos.map(
                  ({ title, content, _id, status, priority, createdAt }) => {
                    return (
                      <Col key={_id}>
                        <Card
                          style={{
                            height: "fit-content",
                            position: "relative",
                            marginBottom: "2rem",
                            backgroundColor:
                              status === "Pending" ? "#FFE0B2" : "#C8E6C9",
                          }}
                        >
                          <DropdownButton
                            id={`dropdown-button-drop-${_id}`}
                            align={"end"}
                            title=""
                            variant="secondry"
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              background: "none",
                              outline: "none",
                            }}
                          >
                            <Dropdown.Item
                              onClick={() =>
                                showModal(title, content, _id, status, priority)
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(_id)}>
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                          <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>{content}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text>Status: {status}</Card.Text>
                            <Card.Text>Priority: {priority}</Card.Text>
                            <Card.Text>
                              CreatedAt: {new Date(createdAt).toLocaleString()}
                            </Card.Text>
                          </Card.Footer>
                        </Card>
                      </Col>
                    );
                  }
                )}
            </>
          )}
        </Row>
      </div>

      {/* Edit Task Model */}

      <Modal
        title="Edit Task"
        style={{ textAlign: "center", alignItems: "center", fontSize: "22px" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          className="add-todo-container"
          style={{
            textAlign: "justify",
            display: "flex",
            flexDirection: "column",
            maxWidth: "500px",
            gap: "15px",
            marginLeft: "auto",
            marginRight: "auto",
            // backgroundColor: "tomato",
          }}
        >
          <div>Enter Task Title</div>
          <Input
            style={{ height: "58px" }}
            placeholder="Enter Task Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div>Enter Task Content</div>
          <TextArea
            style={{ height: "120px" }}
            placeholder="Enter Task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Select
            style={{ height: "58px" }}
            showSearch
            defaultValue={defaultStatus}
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
            defaultValue={defaultPriority}
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
        </div>
      </Modal>
    </>
  );
};

export default DisplayTask;
