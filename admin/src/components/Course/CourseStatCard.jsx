function CourseStatCard({
  title,
  value,
  sub,
  icon,
  color,
}) {

  const colors = {
    blue: {
      icon: "bg-blue-100 text-blue-600",
      badge: "bg-green-100 text-green-600",
    },

    orange: {
      icon: "bg-orange-100 text-orange-600",
      badge: "bg-orange-100 text-orange-600",
    },

    green: {
      icon: "bg-green-100 text-green-600",
      badge: "bg-green-100 text-green-600",
    },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E8EEF8] bg-white p-6 shadow-sm">

      {/* Circle */}

      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-slate-100 opacity-50"></div>

      {/* Header */}

      <div className="relative flex items-start justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${colors[color].icon}`}
        >
          {icon}
        </div>

        {sub && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[color].badge}`}
          >
            {sub}
          </span>
        )}

      </div>

      {/* Content */}

      <div className="relative mt-6">

        <p className="text-lg text-slate-600">
          {title}
        </p>

        <h2 className="mt-2 text-5xl font-bold text-slate-900">
          {value}
        </h2>

      </div>

    </div>
  );
}

export default CourseStatCard;