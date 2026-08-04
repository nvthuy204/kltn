import CourseRow from "./CourseRow";
import courses from "./coursesData";

function CourseTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8EEF8] bg-white shadow-sm">
      <table className="min-w-full">

        {/* Header */}
        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-600">

            <th className="px-6 py-5">
              Tên bài học / Khóa học
            </th>

            <th className="px-6 py-5">
              Trình độ / Chủ đề
            </th>

            <th className="px-6 py-5">
              Số từ
            </th>

            <th className="px-6 py-5">
              Học viên
            </th>

            <th className="px-6 py-5">
              Trạng thái
            </th>

            <th className="px-6 py-5 text-center">
              Thao tác
            </th>

          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-slate-100">

          {courses.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
            />
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default CourseTable;