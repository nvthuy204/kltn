import { FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          Welcome back, Admin
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="text-gray-600 text-xl">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-4xl text-blue-500" />

          <div>
            <p className="font-semibold">
              Administrator
            </p>

            <p className="text-sm text-gray-500">
              admin@lingoverse.com
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;