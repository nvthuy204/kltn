import {
  FaBook,
  FaLanguage,
  FaFileAlt,
  FaGraduationCap,
} from "react-icons/fa";

import StatusBadge from "./StatusBadge";
import LevelBadge from "./LevelBadge";
import ActionMenu from "./ActionMenu";

function CourseRow({ course }) {
  const iconColor = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    gray: "bg-slate-100 text-slate-600",
    green: "bg-green-100 text-green-600",
  };

  const renderIcon = () => {
    switch (course.icon) {
      case "book":
        return <FaBook />;

      case "language":
        return <FaLanguage />;

      case "file":
        return <FaFileAlt />;

      case "graduation":
        return <FaGraduationCap />;

      default:
        return <FaBook />;
    }
  };

  return (
    <tr className="border-t border-slate-100 transition duration-200 hover:bg-blue-50">

      {/* Tên khóa học */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${iconColor[course.color]}`}
          >
            {renderIcon()}
          </div>

          <div>
            <p className="cursor-pointer font-semibold text-slate-800 transition hover:text-blue-600">
              {course.name}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              ID: #{course.id}
            </p>
          </div>

        </div>
      </td>

      {/* Trình độ */}
      <td className="px-6 py-5">
        <LevelBadge level={course.level} />
      </td>

      {/* Số từ */}
      <td className="px-6 py-5">
        <span className="font-semibold text-slate-700">
          {course.vocab}
        </span>
      </td>

      {/* Học viên */}
      <td className="px-6 py-5">
        <span className="font-semibold text-slate-700">
          {course.students}
        </span>
      </td>

      {/* Trạng thái */}
      <td className="px-6 py-5">
        <StatusBadge status={course.status} />
      </td>

      {/* Thao tác */}
      <td className="px-6 py-5">
        <ActionMenu />
      </td>

    </tr>
  );
}

export default CourseRow;