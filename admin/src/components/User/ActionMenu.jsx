import {
  FaEye,
  FaEdit,
  FaLock,
} from "react-icons/fa";

function ActionMenu() {
  return (
    <div className="flex justify-center gap-4 text-gray-500">

      <button className="hover:text-blue-600 transition">
        <FaEye />
      </button>

      <button className="hover:text-green-600 transition">
        <FaEdit />
      </button>

      <button className="hover:text-red-600 transition">
        <FaLock />
      </button>

    </div>
  );
}

export default ActionMenu;