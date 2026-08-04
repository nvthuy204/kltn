import {
  FaSearch,
  FaFilter,
} from "react-icons/fa";

function CourseToolbar() {
  return (
    <div className="rounded-2xl border border-[#E8EEF8] bg-white p-6 shadow-sm">

      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* Search */}

        <div className="relative w-full max-w-md">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Tìm kiếm bài học, khóa học..."
            className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 text-gray-600">

            <FaFilter />

            <span className="font-medium">
              Lọc theo:
            </span>

          </div>

          <select className="h-12 rounded-xl border border-slate-300 px-4 outline-none">

            <option>
              Tất cả cấp độ
            </option>

            <option>
              A1
            </option>

            <option>
              A2
            </option>

            <option>
              B1
            </option>

            <option>
              B2
            </option>

            <option>
              N5
            </option>

            <option>
              N4
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default CourseToolbar;