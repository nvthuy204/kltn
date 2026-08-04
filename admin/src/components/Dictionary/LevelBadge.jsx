function LevelBadge({ level }) {
  const colors = {
    "Sơ cấp": "bg-green-100 text-green-700",
    "Trung cấp": "bg-blue-100 text-blue-700",
    "Cao cấp": "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[level] || "bg-slate-100 text-slate-600"
      }`}
    >
      {level}
    </span>
  );
}

export default LevelBadge;