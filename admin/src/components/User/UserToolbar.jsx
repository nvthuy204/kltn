import {
  FaSearch,
  FaPlus,
  FaSyncAlt,
} from "react-icons/fa";

function UserToolbar() {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div className="flex flex-1 flex-wrap items-center gap-4">

        {/* Search */}

        <div className="relative min-w-[280px] flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        {/* Role */}

        <select className="rounded-xl border border-slate-200 px-4 py-3">
          <option>Tất cả vai trò</option>
          <option>Admin</option>
          <option>Giảng viên</option>
          <option>Học viên</option>
        </select>

        {/* Status */}

        <select className="rounded-xl border border-slate-200 px-4 py-3">
          <option>Tất cả trạng thái</option>
          <option>Hoạt động</option>
          <option>Đã khóa</option>
        </select>

      </div>

      {/* Right */}

      <div className="flex gap-3">

        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-50">
          <FaSyncAlt />
          Làm mới
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
          <FaPlus />
          Thêm người dùng
        </button>

      </div>

    </div>
  );
}

export default UserToolbar;