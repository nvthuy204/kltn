function RoleBadge({ role }) {
  const styles = {
    Admin: "bg-red-100 text-red-600",
    "Giảng viên": "bg-yellow-100 text-yellow-700",
    "Học viên": "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`rounded-lg px-3 py-1 text-sm font-medium ${
        styles[role] || "bg-gray-100 text-gray-600"
      }`}
    >
      {role}
    </span>
  );
}

export default RoleBadge;