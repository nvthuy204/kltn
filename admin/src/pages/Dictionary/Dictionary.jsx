import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import DictionaryStatCard from "../../components/Dictionary/DictionaryStatCard";
import DictionaryFilter from "../../components/Dictionary/DictionaryFilter";
import DictionaryTable from "../../components/Dictionary/DictionaryTable";
import DictionaryPagination from "../../components/Dictionary/DictionaryPagination";

import {
  FaBook,
  FaFileCirclePlus,
  FaTriangleExclamation,
  FaPlus,
} from "react-icons/fa6";


function Dictionary() {


  const navigate = useNavigate();



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

              Quản lý Từ điển

            </h1>




            <p

              className="
                mt-2

                text-sm
                md:text-base

                text-gray-500
              "

            >

              Theo dõi và cập nhật cơ sở dữ liệu từ vựng hệ thống.

            </p>



          </div>







          {/* ADD WORD BUTTON */}



          <button

            onClick={() => navigate("/dictionary/new")}

            className="
              flex
              items-center
              justify-center
              gap-3

              w-full
              sm:w-fit

              rounded-xl

              bg-[#4A90E2]

              px-6
              py-3

              font-semibold

              text-white

              shadow-md

              hover:bg-[#3B82F6]

              transition
            "

          >


            <FaPlus />


            Thêm từ mới



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



          <DictionaryStatCard

            title="Tổng số từ"

            value="15,420"

            sub="+12%"

            icon={<FaBook />}

            color="blue"

          />




          <DictionaryStatCard

            title="Từ mới trong tháng"

            value="342"

            sub="+84"

            icon={<FaFileCirclePlus />}

            color="green"

          />




          <DictionaryStatCard

            title="Báo cáo lỗi chưa xử lý"

            value="12"

            sub="Cần xử lý"

            icon={<FaTriangleExclamation />}

            color="yellow"

          />



        </div>








        {/* ================= FILTER ================= */}



        <div className="mt-2 md:mt-4">


          <DictionaryFilter />


        </div>








        {/* ================= TABLE ================= */}




        <div className="mt-2 md:mt-6">


          <div className="overflow-x-auto">


            <DictionaryTable />


          </div>



        </div>








        {/* ================= PAGINATION ================= */}



        <div className="mt-2 md:mt-4">


          <DictionaryPagination />


        </div>





      </div>


    </AdminLayout>

  );

}


export default Dictionary;