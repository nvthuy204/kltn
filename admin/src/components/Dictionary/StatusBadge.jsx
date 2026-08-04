function StatusBadge({ status }) {
  const colors = {
    "Đã duyệt": "bg-green-100 text-green-700",
    "Chờ duyệt": "bg-yellow-100 text-yellow-700",
    "Bản nháp": "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      ● {status}
    </span>
  );
}

export default StatusBadge;