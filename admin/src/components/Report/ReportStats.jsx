import {
FaTriangleExclamation,
FaSpellCheck,
FaCheck
}
from "react-icons/fa6";


function ReportStats(){


const data=[

{
title:"Tổng báo cáo chờ duyệt",
value:"124",
icon:<FaTriangleExclamation/>,
color:"bg-red-100 text-red-500"
},


{
title:"Lỗi sai nghĩa phổ biến nhất",
value:"45%",
icon:<FaSpellCheck/>,
color:"bg-blue-100 text-blue-600"
},


{
title:"Đã xử lý hôm nay",
value:"38",
icon:<FaCheck/>,
color:"bg-green-100 text-green-600"
}


];


return (

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
">


{
data.map((item,index)=>(


<div
key={index}
className="
bg-white
rounded-xl
border
border-[#DCE9FF]
p-5
shadow-sm
flex
items-center
gap-4
"
>


<div className={`
w-12
h-12
rounded-full
flex
items-center
justify-center
${item.color}
`}>

{item.icon}

</div>



<div>

<p className="
text-sm
text-gray-500
">

{item.title}

</p>


<h2 className="
text-3xl
font-bold
mt-1
">

{item.value}

</h2>


</div>


</div>


))

}



</div>

)


}


export default ReportStats;