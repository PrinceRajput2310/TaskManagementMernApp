import React, { useEffect } from "react";
import Header from "./Header";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { userAnalyticsRequest } from "../redux/reduxSlice/userSlice";
import { taskAnalyticsRequest } from "../redux/reduxSlice/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const COLORS = ["#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Analytics() {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.user);
  const taskAnalytics = useSelector((state) => state.task);
  const userAnalytics = graphData && graphData.data && graphData.data.result;
  const totalUsers =
    userAnalytics &&
    userAnalytics.reduce((total, current) => {
      return total + current.user;
    }, 0);

  useEffect(() => {
    dispatch(userAnalyticsRequest());
    dispatch(taskAnalyticsRequest());
  }, [dispatch]);

  const taskAnalyticsData = [
    {
      name: "Pending Tasks",
      value: taskAnalytics && taskAnalytics.taskAnalytics.pendingTaskPercentage,
      task: taskAnalytics && taskAnalytics.taskAnalytics.pendingTaskCount,
    },
    {
      name: "Completed Tasks",
      value:
        taskAnalytics && taskAnalytics.taskAnalytics.completedTaskPercentage,
      task: taskAnalytics && taskAnalytics.taskAnalytics.completedTaskCount,
    },
  ];

  const CustomLegend = ({ totalUsers }) => {
    return (
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div>
          <span style={{ color: "#A9BA00", marginRight: "8px" }}>●</span>
          <span>{`Total Users: ${totalUsers}`}</span>
        </div>
      </div>
    );
  };

  // Customize the legend to show task counts
  const customLegend = [
    {
      name: `Total Tasks: ${
        taskAnalytics && taskAnalytics.taskAnalytics.totalTaskCount
      }`,
      value: "",
      color: "tomato",
    },
    {
      name: `Pending Tasks: ${
        taskAnalytics && taskAnalytics.taskAnalytics.pendingTaskCount
      }`,
      value: "",
      color: "#00C49F",
    },
    {
      name: `Completed Tasks: ${
        taskAnalytics && taskAnalytics.taskAnalytics.completedTaskCount
      }`,
      value: "",
      color: "#FFBB28",
    },
  ];

  const renderCustomLegend = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        {customLegend.map((entry, index) => (
          <div key={`item-${index}`} style={{ margin: "5px 0" }}>
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                marginRight: "8px",
                // borderRadius: "50%",
              }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  // Custom Tooltip
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>
              {payload[0].name}: {payload[0].value}
            </strong>
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <div style={{ marginBottom: "100px" }}>
      <Header />
      <h1 style={{ textAlign: "center", display: "block", marginTop: "2rem" }}>
        User analytics
      </h1>
      <div
        className="analytics-chart-container"
        style={{
          //   backgroundColor: "tomato",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "400px",
        }}
      >
        <ResponsiveContainer style={{ width: "100%", height: "100%" }}>
          <BarChart
            data={userAnalytics}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend content={<CustomLegend totalUsers={totalUsers} />} />
            <Bar
              dataKey="user"
              fill="#A9BA00 "
              maxBarSize={30}
              baGap={10}
              activeBar={<Rectangle stroke="#A9BA00" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h1 style={{ textAlign: "center", display: "block", marginTop: "2rem" }}>
        Task analytics
      </h1>
      <div
        className="analytics-chart-container"
        style={{
          //   backgroundColor: "tomato",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "400px",
        }}
      >
        <ResponsiveContainer style={{ width: "100%", height: "100%" }}>
          <PieChart>
            <Legend content={renderCustomLegend} />

            <Tooltip content={renderCustomTooltip} />

            <Pie
              data={taskAnalyticsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="task"
            >
              {taskAnalyticsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
