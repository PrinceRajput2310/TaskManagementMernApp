import React, { useEffect } from "react";
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { allTaskRequest } from "../redux/reduxSlice/taskSlice";

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

export default function MyTaskAnalytics() {
  const dispatch = useDispatch();
  const taskAnalytics = useSelector((state) => state.task);

  console.log("--------my task", taskAnalytics);

  useEffect(() => {
    dispatch(allTaskRequest());
  }, [dispatch]);

  const taskAnalyticsData = [
    {
      name: "Pending Tasks",
      value: taskAnalytics && taskAnalytics.allTask.pendingTaskPercentage,
      task: taskAnalytics && taskAnalytics.allTask.pendingTask,
    },
    {
      name: "Completed Tasks",
      value: taskAnalytics && taskAnalytics.allTask.completedTaskPercentage,
      task: taskAnalytics && taskAnalytics.allTask.completedTask,
    },
  ];

  // Customize the legend to show task counts
  const customLegend = [
    {
      name: `Total Tasks: ${taskAnalytics && taskAnalytics.allTask.totalTask}`,
      value: "",
      color: "tomato",
    },
    {
      name: `Pending Tasks: ${
        taskAnalytics && taskAnalytics.allTask.pendingTask
      }`,
      value: "",
      color: "#00C49F",
    },
    {
      name: `Completed Tasks: ${
        taskAnalytics && taskAnalytics.allTask.completedTask
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
    <div style={{ width: "100%", height: "100%" }}>
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
  );
}
