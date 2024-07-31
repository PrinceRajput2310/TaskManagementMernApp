import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apiEndPoints";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Modal, Input } from "antd";

const { TextArea } = Input;

const DisplayTask = ({ todos, getAllTodos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState("");

  const showModal = (title, content, id) => {
    setNewTitle(title);
    setNewTodo(content);
    setEditId(id);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      const updateTask = await axios.put(`${API_URL}/update`, {
        id: editId,
        title: newTitle,
        content: newTodo,
      });
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
      const deletedTask = await axios.delete(`${API_URL}/delete`, {
        data: {
          id,
        },
      });
      getAllTodos();
      console.log("todo deleted Successfully", deletedTask.data);
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  return (
    <>
      <div
        className="display-todo-container"
        style={{
          //   display: "flex",
          //   backgroundColor: "green",
          //   justifyContent: "center",
          margin: "20px",
        }}
      >
        <Row xs={2} md={4} sm={1} className="g-4">
          {todos &&
            todos.map(({ title, content, _id }) => {
              return (
                <Col key={_id}>
                  <Card
                    style={{
                      height: "10rem",
                      position: "relative",
                      marginBottom: "2rem",
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
                        onClick={() => showModal(title, content, _id)}
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
                  </Card>
                </Col>
              );
            })}
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
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextArea
            style={{ height: "120px" }}
            placeholder="Enter Task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default DisplayTask;
