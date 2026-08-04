import AdminLayout from "../../layouts/AdminLayout";

import StatCard from "../../components/Stats/StatCard";
import RevenueChart from "../../components/Chart/RevenueChart";
import PieChartCard from "../../components/Chart/PieChartCard";
import ScoreCard from "../../components/Score/ScoreCard";
import Activity from "../../components/Activity/Activity";
import TopCourses from "../../components/Card/TopCourses";
import RecentUsers from "../../components/Card/RecentUsers";

import {
  FaMoneyBillWave,
  FaUserPlus,
  FaCheckCircle,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";


function Dashboard() {

  return (

    <AdminLayout>


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
              lg:text-6xl

              font-bold

              text-[#1557C0]
            "
          >
            Tổng quan hệ thống
          </h1>



          <p
            className="
              mt-3

              text-base
              md:text-lg

              text-gray-500
            "
          >
            Theo dõi các chỉ số quan trọng của toàn bộ nền tảng
          </p>


        </div>




        <button

          className="
            flex
            items-center
            justify-center
            gap-3

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4
            py-3

            md:px-6
            md:py-4

            shadow-sm

            hover:shadow-md

            duration-200

            w-full
            sm:w-fit
          "

        >

          <FaCalendarAlt className="text-gray-500"/>


          <span className="font-semibold">

            30 Ngày Qua

          </span>


        </button>



      </div>





      {/* ================= STATISTICS ================= */}


      <div

        className="
          mt-6
          md:mt-10

          grid

          grid-cols-1

          sm:grid-cols-2

          xl:grid-cols-4

          gap-5
          md:gap-6
        "

      >


        <StatCard

          title="Tổng doanh thu"

          value="₫1.2B"

          change="+12% so với tháng trước"

          icon={
            <FaMoneyBillWave
              className="text-blue-600"
            />
          }

          iconBg="bg-blue-100"

        />



        <StatCard

          title="Người dùng mới"

          value="4,892"

          change="+8% so với tháng trước"

          icon={
            <FaUserPlus
              className="text-blue-600"
            />
          }

          iconBg="bg-blue-100"

        />



        <StatCard

          title="Tỷ lệ hoàn thành"

          value="68.4%"

          change="+12%"

          icon={
            <FaCheckCircle
              className="text-green-600"
            />
          }

          iconBg="bg-green-100"

        />



        <StatCard

          title="Khóa học"

          value="1,245"

          change="+24 khóa học"

          icon={
            <FaBookOpen
              className="text-yellow-500"
            />
          }

          iconBg="bg-yellow-100"

        />


      </div>







      {/* ================= REVENUE ================= */}


      <div

        className="
          mt-6
          md:mt-8

          grid

          grid-cols-1

          xl:grid-cols-12

          gap-5
          md:gap-6
        "

      >


        <div
          className="
            xl:col-span-8
          "
        >

          <RevenueChart />

        </div>



        <div

          className="
            xl:col-span-4
          "

        >

          <ScoreCard />

        </div>


      </div>







      {/* ================= ACTIVITY ================= */}



      <div

        className="
          mt-6
          md:mt-8

          grid

          grid-cols-1

          xl:grid-cols-12

          gap-5
          md:gap-6
        "

      >


        <div
          className="
            xl:col-span-8
          "
        >

          <Activity />

        </div>




        <div
          className="
            xl:col-span-4
          "
        >

          <TopCourses />

        </div>


      </div>








      {/* ================= USERS ================= */}



      <div

        className="
          mt-6
          md:mt-8

          grid

          grid-cols-1

          xl:grid-cols-12

          gap-5
          md:gap-6
        "

      >


        <div
          className="
            xl:col-span-6
          "
        >

          <RecentUsers />

        </div>





        <div
          className="
            xl:col-span-6
          "
        >

          <PieChartCard />

        </div>



      </div>



    </AdminLayout>

  );

}


export default Dashboard;