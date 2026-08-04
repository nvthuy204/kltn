import { FaSearch, FaFilter } from "react-icons/fa";

function DictionaryFilter() {
  return (
    <div className="rounded-2xl border border-[#E8EEF8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Tìm kiếm từ vựng, phiên âm..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Filter */}

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-slate-600">
            <FaFilter />
            <span className="font-medium">Lọc theo:</span>
          </div>

          <select className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500">
            <option>Tất cả cấp độ</option>
            <option>Sơ cấp</option>
            <option>Trung cấp</option>
            <option>Cao cấp</option>
          </select>

          <select className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500">
            <option>Tất cả trạng thái</option>
            <option>Đã duyệt</option>
            <option>Chờ duyệt</option>
            <option>Bản nháp</option>
          </select>

          <button className="rounded-xl bg-blue-100 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-200">
            Xóa lọc
          </button>
        </div>
      </div>
    </div>
  );
}

export default DictionaryFilter;