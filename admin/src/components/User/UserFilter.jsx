import { FaSearch } from "react-icons/fa";

function UserFilter() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8EEF8] shadow-sm p-6">

      <div className="flex flex-wrap items-center gap-4">

        {/* Label */}

        <span className="font-semibold text-slate-700">
          Lọc theo:
        </span>

        {/* Search */}

        <div className="relative flex-1 min-w-[260px]">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Tìm kiếm tên hoặc email..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        {/* Vai trò */}

        <select className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
          <option>Tất cả vai trò</option>
          <option>Admin</option>
          <option>Giảng viên</option>
          <option>Học viên</option>
        </select>

        {/* Cấp độ */}

        <select className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
          <option>Tất cả cấp độ</option>
          <option>N5</option>
          <option>N4</option>
          <option>N3</option>
          <option>N2</option>
          <option>N1</option>
        </select>

        {/* Trạng thái */}

        <select className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
          <option>Tất cả trạng thái</option>
          <option>Hoạt động</option>
          <option>Đã khóa</option>
        </select>

        {/* Reset */}

        <button className="rounded-xl bg-blue-100 px-6 py-3 font-medium text-blue-600 hover:bg-blue-200 transition">
          Xóa lọc
        </button>

      </div>

    </div>
  );
}

export default UserFilter;