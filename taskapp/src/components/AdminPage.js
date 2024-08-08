import React, { useEffect } from "react";
import { allUsersRequest } from "../redux/reduxSlice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import Header from "./Header";

const columns = [
  {
    title: "Sr No",
    dataIndex: "index",
    render: (text, record, index) => index + 1,
  },
  {
    title: "User name",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: {
      compare: (a, b) => a.email - b.email,
      multiple: 2,
    },
  },
  {
    title: "Total task created",
    dataIndex: "todoCount",
    sorter: {
      compare: (a, b) => a.todoCount - b.todoCount,
      multiple: 1,
    },
  },
];

const AdminPage = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(allUsersRequest());
  }, [dispatch]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Header />
      <h2
        style={{
          alignItems: "center",
          textAlign: "center",
          marginTop: "1%",
        }}
      >
        User Dashboard
      </h2>
      <div
        className="dashboard-table-container"
        style={{ margin: "0px 50px 0px 50px" }}
      >
        <Table
          columns={columns}
          dataSource={allUsers && allUsers.data && allUsers.data.users}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AdminPage;
