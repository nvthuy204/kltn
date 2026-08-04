import {
  FaTrophy,
  FaMedal,
  FaAward,
} from "react-icons/fa";

const rankings = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    score: "980",
    avatar: "https://i.pravatar.cc/100?img=11",
    icon: <FaTrophy />,
    color: "text-yellow-500",
  },
  {
    id: 2,
    name: "Trần Thị B",
    score: "965",
    avatar: "https://i.pravatar.cc/100?img=12",
    icon: <FaMedal />,
    color: "text-slate-400",
  },
  {
    id: 3,
    name: "Lê Minh C",
    score: "950",
    avatar: "https://i.pravatar.cc/100?img=13",
    icon: <FaAward />,
    color: "text-orange-500",
  },
  {
    id: 4,
    name: "Phạm Quốc D",
    score: "940",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    id: 5,
    name: "Hoàng Mai E",
    score: "935",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
];

function RankingCard() {
  return (
    <div className="rounded-2xl border border-[#E8EEF8] bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-100 px-6 py-5">
        <h3 className="text-lg font-bold text-slate-800">
          🏆 Vinh danh tuần
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Top học viên có điểm cao nhất
        </p>
      </div>

      {/* Body */}

      <div className="divide-y divide-slate-100">
        {rankings.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 text-sm font-bold text-slate-500">
                #{index + 1}
              </span>

              <img
                src={user.avatar}
                alt={user.name}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-slate-800">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">
                  {user.score} điểm
                </p>
              </div>
            </div>

            {user.icon && (
              <span className={`text-xl ${user.color}`}>
                {user.icon}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankingCard;