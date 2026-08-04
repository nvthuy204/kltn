function LevelBadge({ level }) {
  const color =
    level === "Trình độ"
      ? "bg-blue-100 text-blue-700"
      : "bg-violet-100 text-violet-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      {level}
    </span>
  );
}

export default LevelBadge;