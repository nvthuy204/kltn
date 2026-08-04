import AdminLayout from "../../layouts/AdminLayout";

import SettingTabs from "../../components/Settings/SettingTabs";
import GeneralSetting from "../../components/Settings/GeneralSetting";
import SystemSetting from "../../components/Settings/SystemSetting";
import BackupCard from "../../components/Settings/BackupCard";

import { FaSave } from "react-icons/fa";


function Settings() {


  return (

    <AdminLayout>


      <div

        className="
          flex
          flex-col

          gap-6
          md:gap-8
        "

      >





        {/* ================= HEADER ================= */}



        <div

          className="
            flex
            flex-col

            gap-5

            lg:flex-row
            lg:items-start
            lg:justify-between
          "

        >



          <div>



            <h1

              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl

                font-bold

                text-[#0058BE]
              "

            >

              Cấu hình hệ thống & Cài đặt

            </h1>




            <p

              className="
                mt-2

                text-sm
                md:text-base

                text-gray-500
              "

            >

              Quản lý cấu hình chung, bảo mật, thông báo và phân quyền hệ thống.

            </p>



          </div>







          {/* SAVE BUTTON */}



          <button

            className="
              flex
              items-center
              justify-center
              gap-2

              w-full
              sm:w-fit

              bg-[#4A90E2]

              text-white

              px-6
              py-3

              rounded-lg

              font-semibold

              shadow-sm

              hover:bg-blue-600

              transition
            "

          >


            <FaSave />


            Lưu thay đổi



          </button>




        </div>








        {/* ================= TAB ================= */}



        <div

          className="
            overflow-x-auto
          "

        >

          <SettingTabs />

        </div>








        {/* ================= CONTENT ================= */}



        <div

          className="
            flex
            flex-col

            gap-6
          "

        >



          <GeneralSetting />



          <SystemSetting />



          <BackupCard />



        </div>





      </div>



    </AdminLayout>

  );

}


export default Settings;