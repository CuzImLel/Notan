import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface props {}

const data = [
  { grade: "1", amount: 4 },
  { grade: "2", amount: 3 },
  { grade: "3", amount: 2 },
  { grade: "4", amount: 1 },
];

const GradeOverviewChart: React.FC = () => {
  return (
    <div
      className="grade_overview_chart_box"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        margin: "0 auto",
        border: "2px solid var(--color-light-gray)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        boxSizing: "border-box",
      }}
    >
      <p style={{ marginBottom: 10 }}>Visualization</p>
      <div className="grade_overview_chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 50, left: 0, bottom: 10 }}
            barCategoryGap={10}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="var(--color-gray)"
            />
            <XAxis type="number" opacity={0} />
            <YAxis
              type="category"
              tickLine={false}
              dataKey="grade"
              axisLine={false}
              className="grade_overview_yaxis"
            />
            <Bar
              dataKey="amount"
              fill="var(--color-blue)"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GradeOverviewChart;
