function SkillBadge({ skills }) {
  const colors = {
    "Nghe": "bg-blue-100 text-blue-700",
    "Đọc": "bg-green-100 text-green-700",
    "Viết": "bg-orange-100 text-orange-700",
    "Nói": "bg-purple-100 text-purple-700",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
            colors[skill] || "bg-slate-100 text-slate-700"
          }`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default SkillBadge;