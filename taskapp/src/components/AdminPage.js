import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const AdminPage = () => {
  const [userListWithTask, setUserListWithtask] = useState([]);

  const userListWithTaskCount = async () => {
    const user = await axios.get("http://localhost:5000/api/v1/allusers", {
      withCredentials: true,
    });
    const data = await user.data.users;
    setUserListWithtask(data);
  };
  useEffect(() => {
    userListWithTaskCount();
  }, []);

  console.log("userListWithTask", userListWithTask);

  return (
    <>
      <h2
        style={{
          alignItems: "center",
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        Total Registerd User Table:
      </h2>

      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Total Task Created</th>
          </tr>
        </thead>
        <tbody>
          {userListWithTask &&
            userListWithTask.map(({ name, email, todoCount, _id },index) => {
              return (
                <tr key={_id}>
                  <td>{index+1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{todoCount}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default AdminPage;
