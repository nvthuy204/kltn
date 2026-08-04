import AdminLayout from "../../layouts/AdminLayout";

import ReportStats from "../../components/Report/ReportStats";
import ReportTable from "../../components/Report/ReportTable";


function Reports() {


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

            Báo cáo

          </h1>




          <p

            className="
              mt-2

              text-sm
              md:text-base

              text-gray-500
            "

          >

            Quản lý và phản hồi các đóng góp từ cộng đồng học tập.

          </p>



        </div>








        {/* ================= STATS ================= */}



        <ReportStats />









        {/* ================= TABLE 1 ================= */}



        <div className="overflow-x-auto">


          <ReportTable

            title="Báo cáo từ vựng"

          />


        </div>








        {/* ================= TABLE 2 ================= */}



        <div className="overflow-x-auto">


          <ReportTable

            title="Báo cáo bài viết"

          />


        </div>





      </div>



    </AdminLayout>

  );

}


export default Reports;