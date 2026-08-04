import AdminLayout from "../../layouts/AdminLayout";

import ExamStatCard from "../../Exam/ExamStatCard";
import ExamToolbar from "../../Exam/ExamToolbar";
import ExamTable from "../../Exam/ExamTable";
import RankingCard from "../../Exam/RankingCard";
import Pagination from "../../Exam/Pagination";

import {
  FaFileAlt,
  FaUsers,
  FaChartLine,
  FaPlus,
} from "react-icons/fa";


function Exams() {


  return (

    <AdminLayout>


      <div className="
        flex
        flex-col
        gap-6
        md:gap-8
      ">




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

                text-[#1557C0]
              "

            >

              Quản lý bài thi

            </h1>




            <p

              className="
                mt-2

                text-sm
                md:text-base

                text-gray-500
              "

            >

              Quản lý ngân hàng đề thi và kết quả học viên.

            </p>


          </div>







          {/* ADD EXAM */}


          <button

            className="
              flex
              items-center
              justify-center
              gap-3

              w-full
              sm:w-fit

              rounded-xl

              bg-[#3B82F6]

              px-6
              py-3

              text-white

              font-semibold

              shadow-md

              hover:bg-blue-700

              transition
            "

          >

            <FaPlus />

            Thêm bài thi mới


          </button>



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


          <ExamStatCard

            title="Tổng số bài thi"

            value="1,248"

            sub="+12% so với tháng trước"

            icon={<FaFileAlt />}

            color="blue"

          />




          <ExamStatCard

            title="Thí sinh hôm nay"

            value="4,821"

            sub="+8% so với hôm qua"

            icon={<FaUsers />}

            color="green"

          />




          <ExamStatCard

            title="Điểm trung bình"

            value="7.4/10"

            sub="Ổn định"

            icon={<FaChartLine />}

            color="blue"

          />



        </div>







        {/* ================= TOOLBAR ================= */}



        <div className="mt-2 md:mt-4">


          <ExamToolbar />


        </div>







        {/* ================= MAIN CONTENT ================= */}



        <div

          className="
            grid

            grid-cols-1

            xl:grid-cols-12

            gap-6
          "

        >





          {/* TABLE */}



          <div

            className="
              xl:col-span-9
            "

          >


            <div className="overflow-x-auto">


              <ExamTable />


            </div>



            <div className="mt-4">


              <Pagination />


            </div>


          </div>








          {/* RANKING */}



          <div

            className="
              xl:col-span-3
            "

          >


            <RankingCard />


          </div>





        </div>




      </div>


    </AdminLayout>

  );

}


export default Exams;