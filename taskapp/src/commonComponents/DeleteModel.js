import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteTaskModel = ({
  handleClose,
  handleShow,
  handleDelete,
  show,
  deletedTaskTitle,
}) => {
  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", alignItems: "center" }}>
            Delete Task Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          are you sure you want to delete this{" "}
          <strong>{deletedTaskTitle}</strong> task ?.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteTaskModel;
