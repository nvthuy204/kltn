import AdminLayout from "../../layouts/AdminLayout";

import WordInfo from "../../components/AddWord/WordInfo";
import TopicBox from "../../components/AddWord/TopicBox";
import ExampleBox from "../../components/AddWord/ExampleBox";
import ImageUpload from "../../components/AddWord/ImageUpload";
import DisplaySetting from "../../components/AddWord/DisplaySetting";


function AddWord() {

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

                text-[#0058BE]
              "

            >

              Thêm từ mới

            </h1>




            <p

              className="
                mt-2

                text-sm
                md:text-base

                text-gray-500
              "

            >

              Bổ sung từ vựng và định nghĩa vào hệ thống từ điển LingoVerse.

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
                border-gray-300

                bg-white

                font-medium

                hover:bg-gray-50

                transition
              "

            >

              Hủy

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

              Lưu từ mới

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





          {/* LEFT */}


          <div

            className="
              xl:col-span-8

              flex
              flex-col

              gap-6
            "

          >


            <WordInfo />


            <TopicBox />


            <ExampleBox />


          </div>







          {/* RIGHT */}



          <div

            className="
              xl:col-span-4

              flex
              flex-col

              gap-6
            "

          >


            <ImageUpload />


            <DisplaySetting />


          </div>



        </div>




      </div>



    </AdminLayout>

  );

}


export default AddWord;