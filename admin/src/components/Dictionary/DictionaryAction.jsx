import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function DictionaryAction() {
  return (
    <div className="flex justify-center gap-4">
      <button className="text-slate-500 transition hover:text-blue-600">
        <FaEye />
      </button>

      <button className="text-slate-500 transition hover:text-green-600">
        <FaEdit />
      </button>

      <button className="text-red-500 transition hover:text-red-700">
        <FaTrash />
      </button>
    </div>
  );
}

export default DictionaryAction;