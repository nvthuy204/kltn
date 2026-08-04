import UserRow from "./UserRow";

const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/100?img=1",
    email: "nguyenvana@example.com",
    role: "Học viên",
    joined: "15/10/2023",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/100?img=2",
    email: "tranthib@example.com",
    role: "Học viên",
    joined: "02/11/2023",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/100?img=3",
    email: "levanc@example.com",
    role: "Giảng viên",
    joined: "20/09/2023",
    status: "Đã khóa",
  },
  {
    id: 4,
    name: "Phạm Minh M",
    avatar: "https://i.pravatar.cc/100?img=4",
    email: "admin@example.com",
    role: "Admin",
    joined: "01/01/2023",
    status: "Hoạt động",
  },
  {
    id: 5,
    name: "Nguyễn Thị D",
    avatar: "https://i.pravatar.cc/100?img=5",
    email: "nguyenthid@example.com",
    role: "Học viên",
    joined: "05/12/2023",
    status: "Hoạt động",
  },
];

function UserTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8EEF8] bg-white shadow-sm">
      <table className="min-w-full">

        {/* Header */}
        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-600">

            <th className="px-6 py-4">
              Họ tên
            </th>

            <th className="px-6 py-4">
              Email
            </th>

            <th className="px-6 py-4">
              Vai trò
            </th>

            <th className="px-6 py-4">
              Ngày tham gia
            </th>

            <th className="px-6 py-4">
              Trạng thái
            </th>

            <th className="px-6 py-4 text-center">
              Thao tác
            </th>

          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-slate-100">

          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
            />
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default UserTable;