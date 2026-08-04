import {
  FaSlidersH,
  FaShieldAlt,
  FaBell,
  FaUserLock
} from "react-icons/fa";


function SettingTabs(){

  return (

    <div className="
      bg-white
      rounded-xl
      border
      border-[#DCE9FF]
    ">


      <div className="
        flex
        items-center
        px-6
      ">


        <button
        className="
        flex
        items-center
        gap-2
        px-6
        py-4
        border-b-4
        border-[#4A90E2]
        text-[#4A90E2]
        font-semibold
        "
        >

          <FaSlidersH/>

          Cài đặt chung

        </button>



        <button
        className="
        flex
        items-center
        gap-2
        px-6
        py-4
        text-gray-500
        font-medium
        "
        >

          <FaShieldAlt/>

          Bảo mật

        </button>



        <button
        className="
        flex
        items-center
        gap-2
        px-6
        py-4
        text-gray-500
        font-medium
        "
        >

          <FaBell/>

          Thông báo

        </button>



        <button
        className="
        flex
        items-center
        gap-2
        px-6
        py-4
        text-gray-500
        font-medium
        "
        >

          <FaUserLock/>

          Phân quyền

        </button>


      </div>


    </div>

  );

}


export default SettingTabs;