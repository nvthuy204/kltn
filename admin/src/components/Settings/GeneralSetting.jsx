import { FaImage, FaUpload } from "react-icons/fa";


function GeneralSetting(){

return (

<div className="
bg-white
rounded-xl
border
border-[#DCE9FF]
p-8
">


<h2 className="
text-2xl
font-bold
text-[#0B1C30]
">

Cài đặt chung

</h2>


<p className="mt-2 text-gray-500">

Cấu hình các thông tin cơ bản của hệ thống.

</p>



<div className="
mt-8
grid
grid-cols-2
gap-6
">


<div>

<label className="
block
mb-2
font-semibold
text-gray-700
">

Tên ứng dụng

</label>


<input

value="LingoVerse"

readOnly

className="
w-full
h-12
border
rounded-lg
px-4
"

/>


</div>



<div>

<label className="
block
mb-2
font-semibold
text-gray-700
">

Email liên hệ

</label>


<input

value="support@lingoverse.com"

readOnly

className="
w-full
h-12
border
rounded-lg
px-4
"

/>


</div>



</div>




<div className="mt-8">


<label className="
font-semibold
text-gray-700
">

Logo hệ thống

</label>



<div className="
mt-3
flex
items-center
gap-6
">


<div className="
w-24
h-24
rounded-xl
border
flex
items-center
justify-center
bg-gray-50
">


<FaImage className="
text-3xl
text-gray-400
"/>


</div>



<button

className="
flex
items-center
gap-2
px-5
py-3
border
rounded-lg
font-semibold
"

>


<FaUpload/>

Tải lên logo mới


</button>



</div>


</div>



<div className="mt-8 max-w-md">


<label className="
font-semibold
block
mb-2
">

Ngôn ngữ mặc định

</label>



<select

className="
w-full
h-12
border
rounded-lg
px-4
"

>

<option>
Tiếng Việt
</option>


<option>
English
</option>


</select>


</div>



</div>

);

}


export default GeneralSetting;