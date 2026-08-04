import AdminLayout from "../../layouts/AdminLayout";

import BasicInfo from "../../components/AddCourse/BasicInfo";
import LessonEditor from "../../components/AddCourse/LessonEditor";
import ImageUpload from "../../components/AddCourse/ImageUpload";
import VocabularyBox from "../../components/AddCourse/VocabularyBox";


function AddCourse() {

  return (

    <AdminLayout>


      <div className="flex flex-col gap-6 md:gap-8">


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

              Thêm bài học mới

            </h1>



            <p

              className="
                mt-2

                text-sm
                md:text-base

                text-gray-500
              "

            >

              Tạo nội dung học tập hấp dẫn cho học viên.

            </p>


          </div>





          {/* BUTTON */}

          <div

            className="
              flex
              flex-col
              sm:flex-row

              gap-3

              w-full
              lg:w-auto
            "

          >


            <button

              className="
                w-full
                sm:w-auto

                px-6
                py-3

                rounded-lg

                border
                border-blue-500

                text-blue-600

                font-semibold

                hover:bg-blue-50

                transition
              "

            >

              Lưu bản nháp

            </button>





            <button

              className="
                w-full
                sm:w-auto

                px-6
                py-3

                rounded-lg

                bg-[#0058BE]

                text-white

                font-semibold

                hover:bg-blue-700

                transition
              "

            >

              Xuất bản

            </button>



          </div>



        </div>







        {/* ================= CONTENT ================= */}



        <div

          className="
            grid

            grid-cols-1

            xl:grid-cols-12

            gap-6
          "

        >



          {/* LEFT CONTENT */}


          <div

            className="
              xl:col-span-8

              flex
              flex-col

              gap-6
            "

          >

            <BasicInfo />


            <LessonEditor />


          </div>







          {/* RIGHT CONTENT */}



          <div

            className="
              xl:col-span-4

              flex
              flex-col

              gap-6
            "

          >


            <ImageUpload />


            <VocabularyBox />


          </div>



        </div>



      </div>



    </AdminLayout>

  );

}


export default AddCourse;