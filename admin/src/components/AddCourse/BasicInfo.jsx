function BasicInfo(){

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

Thông tin cơ bản

</h2>


<hr className="my-4"/>



<label className="font-semibold">
Tên bài học *
</label>


<input
className="
w-full
mt-2
h-12
border
rounded-lg
px-4
"
placeholder="Nhập tên bài học..."
/>



<label className="
block
mt-5
font-semibold
">

Mô tả ngắn

</label>


<textarea

className="
w-full
mt-2
border
rounded-lg
p-3
"

rows="4"

placeholder="Tóm tắt nội dung bài học..."

/>



<div className="
grid
grid-cols-2
gap-5
mt-5
">


<select className="
border
rounded-lg
h-12
px-3
">

<option>
-- Chọn khóa học --
</option>

</select>



<select className="
border
rounded-lg
h-12
px-3
">

<option>
Sơ cấp - A1
</option>

<option>
A2
</option>

<option>
B1
</option>

</select>



</div>


</div>

)

}


export default BasicInfo;