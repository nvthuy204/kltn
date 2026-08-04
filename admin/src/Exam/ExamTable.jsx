import ExamRow from "./ExamRow";
import examData from "./examData";


function ExamTable() {

  return (

    <div className="
      overflow-hidden
      rounded-2xl
      border
      border-[#E8EEF8]
      bg-white
      shadow-sm
    ">


      <table className="w-full table-fixed">


        {/* HEADER */}

        <thead className="bg-slate-50">


          <tr className="text-left text-sm font-semibold text-slate-600">


            <th className="w-[35%] px-5 py-4">
              Tên bài thi
            </th>


            <th className="w-[10%] px-4 py-4 text-center">
              Số câu
            </th>


            <th className="w-[12%] px-4 py-4">
              Thời lượng
            </th>


            <th className="w-[15%] px-4 py-4">
              Kỹ năng
            </th>


            <th className="w-[18%] px-4 py-4">
              Trạng thái
            </th>


            <th className="w-[10%] px-4 py-4 text-center">
              Thao tác
            </th>


          </tr>


        </thead>




        {/* BODY */}


        <tbody className="divide-y divide-slate-100">


          {
            examData.map((exam)=>(
              
              <ExamRow
                key={exam.id}
                exam={exam}
              />

            ))
          }


        </tbody>



      </table>



    </div>

  );

}


export default ExamTable;