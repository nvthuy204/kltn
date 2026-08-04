import {
FaDatabase,
FaDownload,
FaUndo
} from "react-icons/fa";


function BackupCard(){


const cards=[

{
title:"Sao lưu dữ liệu",
text:"Tạo bản sao lưu toàn bộ cơ sở dữ liệu.",
icon:<FaDatabase/>,
button:"Sao lưu ngay"
},


{
title:"Xuất dữ liệu",
text:"Xuất danh sách người dùng, khóa học và báo cáo.",
icon:<FaDownload/>,
button:"Xuất dữ liệu"
},


{
title:"Khôi phục",
text:"Khôi phục dữ liệu từ bản sao lưu đã lưu.",
icon:<FaUndo/>,
button:"Khôi phục"
}

];


return (

<div className="
bg-white
rounded-xl
border
border-[#DCE9FF]
p-8
">


<div className="
flex
justify-between
">

<h2 className="
text-2xl
font-bold
">

Sao lưu & Khôi phục

</h2>


<span className="
bg-green-100
text-green-700
px-4
py-2
rounded-full
text-sm
">

Lần sao lưu gần nhất:
01/08/2026

</span>


</div>



<div className="
grid
grid-cols-3
gap-6
mt-8
">


{
cards.map((card,index)=>(


<div

key={index}

className="
border
rounded-xl
p-6
text-center
"

>


<div className="
mx-auto
w-14
h-14
rounded-xl
bg-blue-100
flex
items-center
justify-center
text-blue-600
text-xl
">

{card.icon}

</div>



<h3 className="
mt-5
font-bold
">

{card.title}

</h3>



<p className="
mt-2
text-sm
text-gray-500
">

{card.text}

</p>



<button

className="
mt-6
w-full
py-3
rounded-lg
bg-[#4A90E2]
text-white
font-semibold
"

>

{card.button}

</button>



</div>


))

}



</div>


</div>

);


}


export default BackupCard;