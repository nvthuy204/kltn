import ReportRow from "./ReportRow";


const data=[

{
name:"Nguyễn Văn A",
word:"Serendipity",
content:"Sai nghĩa",
status:"Chưa xử lý",
date:"10/10/2023"
},


{
name:"Lê Thị B",
word:"Ephemeral",
content:"Lỗi âm thanh",
status:"Chưa xử lý",
date:"10/10/2023"
},


{
name:"Trần C",
word:"Ubiquitous",
content:"Sai ví dụ",
status:"Chưa xử lý",
date:"10/10/2023"
}

];



function ReportTable({title}){


return (

<div className="
bg-white
rounded-xl
border
border-[#DCE9FF]
overflow-hidden
shadow-sm
">


<table className="
w-full
">


<thead className="bg-[#EFF4FF]">


<tr
className="
text-left
text-sm
text-gray-600
">


<th className="px-6 py-4">
Người báo cáo
</th>


<th className="px-6 py-4">
Vấn đề báo cáo
</th>


<th className="px-6 py-4">
Nội dung
</th>


<th className="px-6 py-4">
Trạng thái
</th>


<th className="px-6 py-4">
Ngày gửi
</th>


<th className="px-6 py-4 text-right">
Thao tác
</th>


</tr>


</thead>



<tbody>


{
data.map((item,index)=>(

<ReportRow
key={index}
item={item}
/>

))

}


</tbody>



</table>


</div>


)


}


export default ReportTable;