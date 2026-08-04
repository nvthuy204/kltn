import React from "react";

function UserStatCard({
  title,
  value,
  sub,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      circle: "bg-blue-50",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      circle: "bg-green-50",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      circle: "bg-yellow-50",
    },
  };

  const style = colors[color];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E8EEF8] bg-white p-6 shadow-sm">

      {/* Background Circle */}

      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${style.circle}`}
      />

      {/* Icon */}

      <div
        className={`relative z-10 w-14 h-14 rounded-full ${style.bg} flex items-center justify-center text-2xl ${style.text}`}
      >
        {icon}
      </div>

      {/* Title */}

      <p className="relative z-10 mt-5 text-gray-600 font-medium">
        {title}
      </p>

      {/* Value */}

      <h2 className="relative z-10 mt-3 text-5xl font-bold text-slate-900">
        {value}
      </h2>

      {/* Footer */}

      <p className="relative z-10 mt-3 text-green-600 text-sm">
        {sub}
      </p>
    </div>
  );
}

export default UserStatCard;