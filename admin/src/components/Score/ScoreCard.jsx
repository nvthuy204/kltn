function ScoreCard() {
  const levels = [
    {
      name: "Sơ cấp",
      score: "75 pts",
    },
    {
      name: "Trung cấp",
      score: "75 pts",
    },
    {
      name: "Cao cấp",
      score: "75 pts",
    },
  ];

  return (
    <div className="h-[520px] rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-[36px] font-bold leading-tight">
        Điểm thi trung bình theo cấp độ
      </h2>

      <div className="mt-10 space-y-5">
        {levels.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-2xl border border-slate-300 px-6 py-6 transition hover:bg-slate-50"
          >
            <span className="text-xl font-medium">
              {item.name}
            </span>

            <span className="text-xl font-bold">
              {item.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreCard;