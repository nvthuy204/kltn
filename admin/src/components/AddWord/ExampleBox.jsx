function ExampleBox(){

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

✍️ Ví dụ & Ghi chú

</h2>




<label className="
block
mt-6
text-sm
font-semibold
">

Ví dụ sử dụng

</label>



<input

placeholder="Ví dụ: Nature is full of serendipity."

className="
mt-2
w-full
h-12
border
rounded-lg
px-4
bg-[#F8F9FF]
"

/>




<button

className="
mt-4
text-blue-600
font-semibold
"

>

+ Thêm ví dụ khác

</button>





<label className="
block
mt-6
text-sm
font-semibold
">

Ghi chú bổ sung

</label>



<textarea

rows="4"

placeholder="Ghi chú về ngữ pháp..."

className="
mt-2
w-full
border
rounded-lg
p-4
bg-[#F8F9FF]
"

/>



</div>

);

}


export default ExampleBox;