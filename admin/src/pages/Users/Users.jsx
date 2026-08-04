import AdminLayout from "../../layouts/AdminLayout";

import UserStatCard from "../../components/User/UserStatCard";
import UserToolbar from "../../components/User/UserToolbar";
import UserTable from "../../components/User/UserTable";
import Pagination from "../../components/User/Pagination";

import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
} from "react-icons/fa";


function Users() {


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

            gap-4

            lg:flex-row
            lg:items-center
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

                text-[#1557C0]
              "

            >

              Quản lý người dùng

            </h1>




            <p

              className="
                mt-2

                text-sm
                md:text-lg

                text-gray-500
              "

            >

              Theo dõi và quản lý tài khoản người dùng trên hệ thống

            </p>



          </div>



        </div>







        {/* ================= STATISTIC ================= */}



        <div

          className="
            grid

            grid-cols-1

            sm:grid-cols-2

            xl:grid-cols-3

            gap-5
            md:gap-6
          "

        >



          <UserStatCard

            title="Tổng số người dùng"

            value="12,450"

            sub="+5.2% so với tháng trước"

            icon={<FaUsers />}

            color="blue"

          />




          <UserStatCard

            title="Người dùng hoạt động"

            value="8,920"

            sub="Trong 30 ngày qua"

            icon={<FaUserCheck />}

            color="green"

          />




          <UserStatCard

            title="Người dùng mới"

            value="145"

            sub="+12 từ hôm qua"

            icon={<FaUserPlus />}

            color="yellow"

          />



        </div>







        {/* ================= TOOLBAR ================= */}



        <div className="mt-2 md:mt-4">


          <UserToolbar />


        </div>








        {/* ================= TABLE ================= */}



        <div className="mt-2 md:mt-6">


          <div className="overflow-x-auto">


            <UserTable />


          </div>



        </div>







        {/* ================= PAGINATION ================= */}



        <div className="mt-2 md:mt-6">


          <Pagination />


        </div>




      </div>



    </AdminLayout>

  );

}


export default Users;