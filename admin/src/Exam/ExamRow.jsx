import {
  FaFileAlt,
  FaClipboardCheck,
} from "react-icons/fa";


import SkillBadge from "./SkillBadge";
import StatusBadge from "./StatusBadge";
import ExamAction from "./ExamAction";



function ExamRow({exam}){


return (

<tr className="
border-t
border-slate-100
transition
hover:bg-slate-50
">


{/* TÊN BÀI THI */}

<td className="px-5 py-5">


<div className="flex items-center gap-4">


<div className="
flex
h-11
w-11
shrink-0
items-center
justify-center
rounded-xl
bg-blue-100
text-blue-600
">


{
exam.questions >=40
?
<FaClipboardCheck/>
:
<FaFileAlt/>
}


</div>



<div className="min-w-0">


<p className="
font-semibold
text-slate-800
truncate
">


{exam.name}


</p>



<p className="
mt-1
text-xs
text-slate-400
">


{exam.code}


</p>


</div>



</div>


</td>





{/* SỐ CÂU */}


<td className="
px-4
py-5
text-center
font-medium
">

{exam.questions}

</td>





{/* THỜI LƯỢNG */}


<td className="
px-4
py-5
">

{exam.duration}

</td>





{/* KỸ NĂNG */}


<td className="
px-4
py-5
">

<SkillBadge skills={exam.skills}/>


</td>





{/* TRẠNG THÁI */}


<td className="
px-4
py-5
">


<StatusBadge status={exam.status}/>


</td>





{/* THAO TÁC */}


<td className="
px-4
py-5
text-center
">


<ExamAction/>


</td>




</tr>


);


}



export default ExamRow;