import AdminLayout from "../../layouts/AdminLayout";

import CourseStatCard from "../../components/Course/CourseStatCard";
import CourseToolbar from "../../components/Course/CourseToolbar";
import CourseTable from "../../components/Course/CourseTable";
import Pagination from "../../components/Course/Pagination";

import {
  FaBook,
  FaBookOpen,
  FaGear,
} from "react-icons/fa6";


function Courses() {


  return (

    <AdminLayout>


      <div className="
        flex
        flex-col
        gap-6
        md:gap-8
      ">



        {/* ================= HEADER ================= */}


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

            Quản lý Bài học

          </h1>



          <p

            className="
              mt-2

              text-sm
              md:text-base

              text-gray-500
            "

          >

            Tổng quan và quản lý nội dung học tập trên nền tảng.

          </p>



        </div>







        {/* ================= STATISTIC ================= */}



        <div

          className="
            grid

            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-3

            gap-5
            md:gap-6
          "

        >


          <CourseStatCard

            title="Tổng số khóa học"

            value="48"

            icon={<FaBook />}

            color="blue"

            sub="+12%"

          />




          <CourseStatCard

            title="Tổng số bài học"

            value="1,240"

            icon={<FaBookOpen />}

            color="orange"

          />




          <CourseStatCard

            title="Bài học mới trong tháng"

            value="36"

            icon={<FaGear />}

            color="green"

          />



        </div>







        {/* ================= TOOLBAR ================= */}



        <div className="mt-2 md:mt-4">


          <CourseToolbar />


        </div>








        {/* ================= TABLE ================= */}



        <div

          className="
            mt-2
            md:mt-4
          "

        >


          {/* Mobile có thể kéo ngang */}

          <div className="overflow-x-auto">

            <CourseTable />

          </div>



          <div className="mt-4">

            <Pagination />

          </div>



        </div>





      </div>



    </AdminLayout>

  );

}


export default Courses;