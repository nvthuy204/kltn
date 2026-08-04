import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function ExamAction() {
  return (
    <div className="flex justify-center gap-4">
      {/* Xem */}

      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-100 hover:text-blue-600"
        title="Xem"
      >
        <FaEye />
      </button>

      {/* Sửa */}

      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-green-100 hover:text-green-600"
        title="Chỉnh sửa"
      >
        <FaEdit />
      </button>

      {/* Xóa */}

      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-100 hover:text-red-700"
        title="Xóa"
      >
        <FaTrash />
      </button>
    </div>
  );
}

export default ExamAction;