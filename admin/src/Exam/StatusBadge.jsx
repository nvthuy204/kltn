function StatusBadge({ status }) {
  const styles = {
    "Đang hoạt động":
      "bg-green-100 text-green-700",

    "Bản nháp":
      "bg-slate-100 text-slate-600",

    "Đã khóa":
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      ● {status}
    </span>
  );
}

export default StatusBadge;