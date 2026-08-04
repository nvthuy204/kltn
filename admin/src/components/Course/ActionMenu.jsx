import { useState } from "react";
import {
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaCopy,
  FaTrash,
} from "react-icons/fa";

function ActionMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-center">

      {/* Button */}

      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
      >
        <FaEllipsisV />
      </button>

      {/* Dropdown */}

      {open && (
        <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50">

            <FaEye />

            Xem chi tiết

          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50">

            <FaEdit />

            Chỉnh sửa

          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50">

            <FaCopy />

            Nhân bản

          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">

            <FaTrash />

            Xóa

          </button>

        </div>
      )}
    </div>
  );
}

export default ActionMenu;