"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "公司法人", value: 20, color: "#4F86F7" },
  { name: "公司董事长", value: 30, color: "#54C7C3" },
  { name: "公司总经理", value: 15, color: "#A2D86C" },
  { name: "部门经理", value: 12, color: "#FFC658" },
  { name: "部门主管", value: 13, color: "#FF6B84" },
  { name: "员工", value: 10, color: "#8884d8" },
]

export function OccupationChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => <span className="text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
