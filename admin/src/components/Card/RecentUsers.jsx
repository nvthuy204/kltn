import {
  FaUserCircle,
  FaCircle,
} from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vana@gmail.com",
    status: "Online",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranb@gmail.com",
    status: "Offline",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    status: "Online",
  },
  {
    id: 4,
    name: "Phạm D",
    email: "phamd@gmail.com",
    status: "Online",
  },
];

function RecentUsers() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <h2 className="text-3xl font-bold mb-2">
        Người dùng mới
      </h2>

      <p className="text-gray-500 mb-8">
        Thành viên vừa đăng ký
      </p>

      <div className="space-y-5">

        {users.map((user) => (

          <div
            key={user.id}
            className="flex justify-between items-center"
          >

            <div className="flex items-center gap-4">

              <FaUserCircle className="text-5xl text-blue-500" />

              <div>

                <h3 className="font-bold">
                  {user.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {user.email}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <FaCircle
                className={
                  user.status === "Online"
                    ? "text-green-500 text-xs"
                    : "text-gray-400 text-xs"
                }
              />

              <span className="text-sm">
                {user.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentUsers;