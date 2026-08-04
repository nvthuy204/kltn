import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBookOpen,
  FaLanguage,
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";


function Sidebar({ open = true, closeMenu }) {

  const location = useLocation();

  const navigate = useNavigate();


  const menus = [
    {
      title: "Tổng quan",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      title: "Người dùng",
      path: "/users",
      icon: <FaUsers />,
    },

    {
      title: "Bài học",
      path: "/courses",
      icon: <FaBookOpen />,
    },

    {
      title: "Từ điển",
      path: "/dictionary",
      icon: <FaLanguage />,
    },

    {
      title: "Thi thử",
      path: "/exams",
      icon: <FaClipboardList />,
    },

    {
      title: "Báo cáo",
      path: "/reports",
      icon: <FaChartBar />,
    },
  ];



  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };



  return (

    <aside

      className={`
      
      fixed
      top-0
      left-0
      z-50

      h-screen
      w-[280px]

      bg-[#EAF2FF]

      border-r
      border-blue-100

      flex
      flex-col

      transition-transform
      duration-300


      ${

        open

        ? "translate-x-0"

        : "-translate-x-full"

      }


      md:translate-x-0

      `}

    >



      {/* Logo */}

      <div className="
        h-24
        flex
        items-center
        px-8
      ">

        <h1 className="
          text-[38px]
          font-bold
          text-[#1557C0]
        ">
          LingoVerse
        </h1>

      </div>





      {/* Admin */}

      <div className="px-8 pb-8">

        <div className="
          flex
          items-center
          gap-4
        ">

          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="
              w-12
              h-12
              rounded-full
            "
          />


          <div>

            <h3 className="
              font-semibold
              text-green-700
            ">
              Bếp trưởng Admin
            </h3>


            <p className="
              text-sm
              text-gray-500
            ">
              Quản lý hệ thống
            </p>


          </div>

        </div>

      </div>





      {/* Menu */}

      <nav className="
        px-4
        space-y-1
        flex-1
      ">


        {
          menus.map((item)=>(

            <Link

              key={item.path}

              to={item.path}

              onClick={closeMenu}

              className={`

                flex
                items-center
                gap-4

                px-5
                py-4

                rounded-xl

                font-medium

                transition


                ${
                  location.pathname === item.path

                  ? "bg-[#3B82F6] text-white shadow-lg"

                  : "text-gray-700 hover:bg-blue-100"

                }

              `}

            >

              <span className="text-lg">

                {item.icon}

              </span>


              {item.title}


            </Link>

          ))
        }


      </nav>





      {/* Add Lesson */}

      <div className="px-5">


        <Link

          to="/courses/new"

          onClick={closeMenu}

          className="
            flex
            items-center
            justify-center
            gap-3

            rounded-xl

            bg-[#3B82F6]

            py-4

            text-white

            font-medium

            shadow-md
          "

        >

          <FaPlus />

          Thêm bài học mới


        </Link>


      </div>





      {/* Bottom */}

      <div className="
        p-5
        mt-6

        border-t
        border-blue-100
      ">


        <Link

          to="/settings"

          onClick={closeMenu}

          className="
            flex
            items-center
            gap-4

            rounded-xl

            px-4
            py-3

            text-gray-700

            hover:bg-blue-100
          "

        >

          <FaCog />

          Cài đặt


        </Link>




        <button

          onClick={handleLogout}

          className="
            mt-2

            flex
            w-full

            items-center
            gap-4

            rounded-xl

            px-4
            py-3

            text-red-600

            hover:bg-red-50
          "

        >

          <FaSignOutAlt />

          Đăng xuất


        </button>


      </div>


    </aside>

  );

}


export default Sidebar;