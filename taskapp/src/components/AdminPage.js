import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { allUsersRequest } from "../redux/reduxSlice/userSlice";
import { useSelector, useDispatch } from "react-redux";

const AdminPage = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsersRequest());
  }, [dispatch]);

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
          {allUsers &&
            allUsers.data &&
            allUsers.data.users.map(
              ({ name, email, todoCount, _id }, index) => {
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{todoCount}</td>
                  </tr>
                );
              }
            )}
        </tbody>
      </Table>
    </>
  );
};

export default AdminPage;
