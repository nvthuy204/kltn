import { FaSearch } from "react-icons/fa";

function ExamToolbar() {
  const tabs = [
    "Tất cả bài thi",
    "Sơ cấp A1-A2",
    "Trung cấp B1-B2",
    "Cao cấp C1-C2",
  ];

  const levels = ["A1", "A2"];

  return (
    <div className="rounded-2xl border border-[#E8EEF8] bg-white shadow-sm">
      {/* Top Tabs */}

      <div className="border-b border-slate-100 px-6 pt-4">
        <div className="flex gap-8">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`pb-4 text-sm font-semibold transition ${
                index === 0
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}

      <div className="flex items-center justify-between px-6 py-5">
        {/* Search */}

        <div className="relative w-[360px]">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Tìm kiếm bài thi, chủ đề..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Level */}

        <div className="flex gap-3">
          {levels.map((level, index) => (
            <button
              key={level}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamToolbar;