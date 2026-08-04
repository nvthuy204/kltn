function RecentUsers() {
  const users = [
    {
      name: "Nguyễn Văn A",
      course: "ReactJS",
    },
    {
      name: "Trần Văn B",
      course: "NodeJS",
    },
    {
      name: "Lê Văn C",
      course: "Flutter",
    },
    {
      name: "Phạm Văn D",
      course: "Laravel",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-96">

      <h2 className="text-xl font-bold mb-6">
        Recent Users
      </h2>

      <div className="space-y-4">

        {users.map((user, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-3"
          >
            <span>{user.name}</span>

            <span className="text-blue-600">
              {user.course}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentUsers;