function ImageUpload(){

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

🖼 Hình ảnh minh họa

</h2>



<label className="
mt-6
h-48
border-2
border-dashed
rounded-xl
flex
flex-col
items-center
justify-center
cursor-pointer
bg-[#F8F9FF]
">


<input 
type="file"
className="hidden"
/>


<div className="
text-4xl
text-gray-400
">
☁
</div>



<p className="
mt-3
text-center
font-semibold
">

Kéo thả ảnh vào đây
<br/>
hoặc click để tải lên

</p>



<span className="
text-xs
text-gray-400
mt-2
">

JPG, PNG (Max 5MB)

</span>



</label>


</div>

);

}


export default ImageUpload;