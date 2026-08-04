function DictionaryStatCard({
  title,
  value,
  sub,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: {
      icon: "bg-blue-100 text-blue-600",
      badge: "bg-green-100 text-green-700",
    },

    green: {
      icon: "bg-green-100 text-green-600",
      badge: "bg-green-100 text-green-700",
    },

    yellow: {
      icon: "bg-yellow-100 text-yellow-600",
      badge: "bg-yellow-100 text-yellow-700",
    },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E8EEF8] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Background */}

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-slate-100 opacity-40" />

      {/* Top */}

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${
            colors[color].icon
          }`}
        >
          {icon}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            colors[color].badge
          }`}
        >
          {sub}
        </span>
      </div>

      {/* Content */}

      <div className="relative mt-6">
        <p className="text-gray-500">{title}</p>

        <h2 className="mt-2 text-5xl font-bold text-slate-900">
          {value}
        </h2>
      </div>
    </div>
  );
}

export default DictionaryStatCard;