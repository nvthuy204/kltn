function StatCard({
  title,
  value,
  change,
  icon,
  color = "blue",
  progress,
}) {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <div className="rounded-3xl border border-[#E8EEF8] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div className="flex-1">

          <p className="text-[15px] font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-[42px] font-bold leading-none text-slate-900">
            {value}
          </h2>

          {change && (
            <p className="mt-5 text-sm font-medium text-green-600">
              {change}
            </p>
          )}

          {progress !== undefined && (
            <div className="mt-6">

              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>Tiến độ chung</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2.5 w-full rounded-full bg-slate-200">

                <div
                  className="h-2.5 rounded-full bg-[#1557C0]"
                  style={{ width: `${progress}%` }}
                />

              </div>

            </div>
          )}

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${theme.bg} ${theme.text} text-2xl`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;