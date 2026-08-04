import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "N5",
    value: 45,
  },
  {
    name: "N4",
    value: 30,
  },
  {
    name: "N3",
    value: 15,
  },
  {
    name: "N2",
    value: 10,
  },
];

const COLORS = [
  "#2563EB",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

function PieChartCard() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 h-full">

      <h2 className="text-3xl font-bold">
        Phân bố học viên
      </h2>

      <p className="text-gray-500 mt-2">
        Theo cấp độ học
      </p>

      <div className="h-[320px] mt-8">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="space-y-3">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex justify-between"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: COLORS[index],
                }}
              />

              <span>
                {item.name}
              </span>

            </div>

            <span className="font-semibold">

              {item.value}%

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PieChartCard;