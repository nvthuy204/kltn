function StatusBadge({ status }) {
  const published = status === "Đã xuất bản";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        published
          ? "bg-green-100 text-green-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      <span className="mr-2 text-[10px]">●</span>

      {status}
    </span>
  );
}

export default StatusBadge;