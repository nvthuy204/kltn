function StatusBadge({ status }) {
  const active = status === "Hoạt động";

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        active
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      ● {status}
    </span>
  );
}

export default StatusBadge;