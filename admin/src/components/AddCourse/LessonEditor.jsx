function LessonEditor(){

return (

<div className="
bg-white
rounded-2xl
border
p-6
">


<h2 className="
text-2xl
font-semibold
">

Nội dung bài học

</h2>


<hr className="my-4"/>



<div className="
h-12
border
bg-gray-50
flex
items-center
gap-5
px-4
">


<b>B</b>
<i>I</i>
<u>U</u>

<span>|</span>

☷
☰
🔗
🖼️


</div>



<textarea

className="
w-full
h-[360px]
border
rounded-b-xl
p-5
resize-none
"

placeholder="
Soạn thảo nội dung bài học tại đây...
"

/>


</div>

)

}


export default LessonEditor;