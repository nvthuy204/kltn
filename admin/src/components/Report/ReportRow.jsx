import {
FaEye,
FaCheck,
FaTrash
}
from "react-icons/fa";


function ReportRow({item}){


return (

<tr
className="
border-t
hover:bg-slate-50
"
>


<td className="
px-6
py-5
">


<div className="
flex
items-center
gap-3
">


<div className="
w-8
h-8
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
text-xs
font-bold
">

N

</div>


<span className="font-medium">

{item.name}

</span>


</div>


</td>



<td className="
px-6
text-blue-600
font-semibold
">

{item.word}

</td>




<td className="px-6">


<span className="
px-3
py-1
rounded-full
bg-red-100
text-red-600
text-xs
">

{item.content}

</span>


</td>




<td className="px-6">


<span className="
px-3
py-1
rounded-full
bg-red-100
text-red-600
text-xs
">

{item.status}

</span>


</td>



<td className="px-6">

{item.date}

</td>



<td className="
px-6
flex
justify-end
gap-3
py-5
">


<FaEye className="text-gray-500"/>

<FaCheck className="text-green-500"/>

<FaTrash className="text-red-500"/>


</td>



</tr>


)


}


export default ReportRow;