import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { myScoreRankRequest } from "../redux/reduxSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";

// const data = [
//   { range: "0-20%", count: 5 },
//   { range: "20-40%", count: 12 },
//   { range: "40-60%", count: 8 },
//   { range: "60-80%", count: 15 },
//   { range: "80-100%", count: 10 },
// ];

// const currentUserPercentage = 57;

const YourScoreBarGraph = () => {
  const dispatch = useDispatch();
  const { myScore } = useSelector((state) => state.user);
  const currentUserPercentage = myScore.currentUserCompletionPercentage;

  console.log("---------my score data", myScore.result);

  useEffect(() => {
    dispatch(myScoreRankRequest());
  }, [dispatch]);

  const getUserRangeAndIndex = (percentage) => {
    if (percentage <= 20) return 0;
    if (percentage <= 40) return 1;
    if (percentage <= 60) return 2;
    if (percentage <= 80) return 3;
    return 4;
  };

  const userIndex = getUserRangeAndIndex(currentUserPercentage);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const isUserHere =
        payload[0].payload.range ===
        myScore.result[getUserRangeAndIndex(currentUserPercentage)].range;
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`User : ${payload[0].value}`}</p>
          {isUserHere && (
            <p className="intro" style={{ color: "red" }}>
              You are here
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        My Task Completion Ranking
      </h2>
      <ResponsiveContainer>
        <BarChart
          data={myScore.result}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="user">
            {myScore &&
              myScore.result &&
              myScore.result.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === userIndex ? "#ce5a5a" : "#75c85d"}
                />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YourScoreBarGraph;
