import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Pagination() {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E8EEF8] bg-white px-6 py-5 shadow-sm md:flex-row">
      {/* Thông tin */}

      <p className="text-sm text-slate-500">
        Hiển thị{" "}
        <span className="font-semibold">
          1 - 6
        </span>{" "}
        trong{" "}
        <span className="font-semibold">
          1,248
        </span>{" "}
        bài thi
      </p>

      {/* Pagination */}

      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100">
          <FaChevronLeft />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-semibold text-white">
          1
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100">
          2
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100">
          3
        </button>

        <span className="px-2 text-slate-400">
          ...
        </span>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-100">
          208
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;