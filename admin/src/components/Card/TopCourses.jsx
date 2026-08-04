import {
  FaBookOpen,
  FaArrowUp,
} from "react-icons/fa";

const courses = [
  {
    id: 1,
    name: "ReactJS Cơ bản",
    students: 1280,
    growth: "+12%",
  },
  {
    id: 2,
    name: "Tiếng Nhật N5",
    students: 980,
    growth: "+9%",
  },
  {
    id: 3,
    name: "Tiếng Anh Giao tiếp",
    students: 845,
    growth: "+7%",
  },
  {
    id: 4,
    name: "NodeJS API",
    students: 720,
    growth: "+5%",
  },
];

function TopCourses() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Khóa học nổi bật
          </h2>

          <p className="text-gray-500 mt-2">
            Theo số lượng học viên
          </p>
        </div>

        <FaBookOpen className="text-3xl text-blue-600" />

      </div>

      <div className="space-y-5">

        {courses.map((course) => (

          <div
            key={course.id}
            className="border rounded-2xl p-5 hover:bg-slate-50 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-bold">
                  {course.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {course.students.toLocaleString()} học viên
                </p>

              </div>

              <div className="flex items-center gap-2 text-green-600 font-semibold">

                <FaArrowUp />

                {course.growth}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopCourses;