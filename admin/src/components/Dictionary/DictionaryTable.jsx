import DictionaryRow from "./DictionaryRow";
import dictionaryData from "./dictionaryData";

function DictionaryTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8EEF8] bg-white shadow-sm">
      <table className="min-w-full">
        {/* Header */}

        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-600">
            <th className="px-6 py-4">
              Từ vựng
            </th>

            <th className="px-6 py-4">
              Phiên âm
            </th>

            <th className="px-6 py-4">
              Nghĩa
            </th>

            <th className="px-6 py-4">
              Chủ đề
            </th>

            <th className="px-6 py-4">
              Cấp độ
            </th>

            <th className="px-6 py-4">
              Trạng thái
            </th>

            <th className="px-6 py-4 text-center">
              Thao tác
            </th>
          </tr>
        </thead>

        {/* Body */}

        <tbody>
          {dictionaryData.map((item) => (
            <DictionaryRow
              key={item.id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DictionaryTable;