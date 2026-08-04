function ImageUpload(){

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

Ảnh minh họa

</h2>


<hr className="my-4"/>


<label className="
h-[280px]
border-2
border-dashed
rounded-xl
flex
flex-col
items-center
justify-center
cursor-pointer
">


<div className="
w-16
h-16
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
text-2xl
">

☁

</div>


<p className="
mt-5
text-blue-600
font-semibold
">

Nhấn để tải lên

</p>


<p className="
text-sm
text-gray-500
">

PNG, JPG &lt; 2MB

</p>


<input
type="file"
className="hidden"
/>


</label>


</div>

)

}

export default ImageUpload;