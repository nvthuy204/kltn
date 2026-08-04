import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { FaEllipsisH } from "react-icons/fa";

const data = [
  { month: "T1", users: 120 },
  { month: "T2", users: 180 },
  { month: "T3", users: 250 },
  { month: "T4", users: 320 },
  { month: "T5", users: 410 },
  { month: "T6", users: 520 },
  { month: "T7", users: 610 },
  { month: "T8", users: 720 },
  { month: "T9", users: 690 },
  { month: "T10", users: 810 },
  { month: "T11", users: 930 },
  { month: "T12", users: 1050 },
];

function RevenueChart() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Lượng truy cập nền tảng
          </h2>

          <p className="mt-2 text-gray-500">
            Đo lường theo tháng (2026)
          </p>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <FaEllipsisH size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <LineChart
          width={720}
          height={360}
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="#EEF2F7"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#2563EB"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
}

export default RevenueChart;