import {
  FaBook,
  FaLanguage,
} from "react-icons/fa";

import LevelBadge from "./LevelBadge";
import StatusBadge from "./StatusBadge";
import DictionaryAction from "./DictionaryAction";

function DictionaryRow({ item }) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
      {/* Từ vựng */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            {item.type === "Noun" ? (
              <FaBook />
            ) : (
              <FaLanguage />
            )}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {item.word}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {item.type}
            </p>
          </div>
        </div>
      </td>

      {/* Phiên âm */}

      <td className="px-6 py-5 font-mono text-slate-600">
        {item.pronunciation}
      </td>

      {/* Nghĩa */}

      <td className="px-6 py-5">
        {item.meaning}
      </td>

      {/* Chủ đề */}

      <td className="px-6 py-5">
        {item.topic}
      </td>

      {/* Cấp độ */}

      <td className="px-6 py-5">
        <LevelBadge level={item.level} />
      </td>

      {/* Trạng thái */}

      <td className="px-6 py-5">
        <StatusBadge status={item.status} />
      </td>

      {/* Thao tác */}

      <td className="px-6 py-5">
        <DictionaryAction />
      </td>
    </tr>
  );
}

export default DictionaryRow;