function ChartCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Revenue Overview
        </h2>

        <select className="border rounded-lg px-3 py-2">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="flex items-end justify-between h-60 px-6">

        <div className="w-10 bg-blue-400 rounded-t h-24"></div>

        <div className="w-10 bg-blue-500 rounded-t h-40"></div>

        <div className="w-10 bg-blue-600 rounded-t h-52"></div>

        <div className="w-10 bg-blue-500 rounded-t h-32"></div>

        <div className="w-10 bg-blue-600 rounded-t h-60"></div>

        <div className="w-10 bg-blue-500 rounded-t h-44"></div>

      </div>
    </div>
  );
}

export default ChartCard;