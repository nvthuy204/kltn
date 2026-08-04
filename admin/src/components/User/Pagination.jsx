import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Pagination() {
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#E8EEF8] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Left */}

      <p className="text-sm text-slate-500">
        Hiển thị
        <span className="mx-1 font-semibold text-slate-800">
          1-10
        </span>
        trong tổng số
        <span className="mx-1 font-semibold text-slate-800">
          124
        </span>
        người dùng
      </p>

      {/* Right */}

      <div className="flex items-center gap-2">

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 transition">
          <FaChevronLeft />
        </button>

        <button className="h-10 w-10 rounded-xl bg-blue-600 font-semibold text-white">
          1
        </button>

        <button className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
          2
        </button>

        <button className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
          3
        </button>

        <span className="px-2 text-slate-500">
          ...
        </span>

        <button className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
          13
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 transition">
          <FaChevronRight />
        </button>

      </div>

    </div>
  );
}

export default Pagination;