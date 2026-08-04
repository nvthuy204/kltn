import {
  FaUserPlus,
  FaBookOpen,
  FaBug,
  FaArrowRight,
} from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaUserPlus />,
    color: "bg-blue-100 text-blue-600",
    title: "Người dùng mới",
    desc: "Nguyễn Văn A vừa đăng ký tài khoản.",
    time: "2 phút trước",
  },
  {
    id: 2,
    icon: <FaBookOpen />,
    color: "bg-green-100 text-green-600",
    title: "Khóa học mới",
    desc: "Đã thêm khóa học ReactJS nâng cao.",
    time: "30 phút trước",
  },
  {
    id: 3,
    icon: <FaBug />,
    color: "bg-red-100 text-red-600",
    title: "Báo lỗi",
    desc: "Video bài học #102 không phát được.",
    time: "1 giờ trước",
  },
];

function Activity() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            Hoạt động gần đây
          </h2>

          <p className="text-gray-500 mt-2">
            Cập nhật mới nhất từ hệ thống
          </p>
        </div>

        <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 duration-200">
          Xem tất cả
          <FaArrowRight />
        </button>
      </div>

      {/* List */}
      <div className="space-y-6">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 p-5 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-5">

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${item.color}`}
              >
                {item.icon}
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.desc}
                </p>
              </div>

            </div>

            <span className="text-sm text-gray-400 whitespace-nowrap">
              {item.time}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Activity;