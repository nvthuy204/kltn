function TopicBox(){

return (

<div className="
bg-white
rounded-2xl
border
p-6
">


<h2 className="
text-xl
font-bold
border-b
pb-4
">

📚 Chủ đề (Topic)

</h2>



<div className="
flex
gap-4
mt-6
">


<select

className="
flex-1
h-12
border
rounded-lg
px-4
bg-[#F8F9FF]
"

>

<option>
Chọn một chủ đề có sẵn
</option>

<option>
Giao tiếp
</option>

<option>
Du lịch
</option>

<option>
Công việc
</option>

</select>




<button

className="
h-12
px-5
rounded-lg
border-2
border-dashed
border-blue-500
text-blue-600
font-semibold
"

>

+ Thêm chủ đề mới

</button>



</div>



</div>

);

}


export default TopicBox;