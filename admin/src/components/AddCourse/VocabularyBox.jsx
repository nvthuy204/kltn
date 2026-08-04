function VocabularyBox(){

return (

<div className="
bg-white
rounded-2xl
border
p-6
">


<div className="
flex
justify-between
">

<h2 className="
text-2xl
font-semibold
">

Từ vựng đính kèm

</h2>


<button
className="
w-8
h-8
border
border-blue-500
text-blue-600
rounded-full
"
>

+

</button>


</div>


<hr className="my-4"/>


<div className="
border
border-dashed
rounded-xl
py-10
text-center
">


<p className="
text-gray-500
">

Chưa có từ vựng nào.

</p>


<button
className="
mt-4
text-blue-600
font-semibold
">

Thêm từ mới

</button>


</div>


</div>

)

}


export default VocabularyBox;