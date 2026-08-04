function Toggle(){

return (

<div className="
w-11
h-6
bg-[#4A90E2]
rounded-full
relative
">

<div className="
absolute
right-1
top-1
w-4
h-4
bg-white
rounded-full
"/>

</div>

)

}



function SystemSetting(){

const items=[

[
"Cho phép đăng ký tài khoản",
"Người dùng mới có thể tự tạo tài khoản."
],

[
"Gửi email thông báo",
"Gửi email khi có cập nhật mới trong hệ thống."
],

[
"Chế độ bảo trì",
"Tạm thời khóa truy cập của người dùng."
]

];


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
">

Cài đặt hệ thống

</h2>



<p className="
mt-2
text-gray-500
">

Thiết lập các tùy chọn mặc định cho toàn bộ hệ thống.

</p>



<div className="
mt-8
space-y-6
">


{
items.map((item,index)=>(


<div key={index}>


<div className="
flex
justify-between
items-center
">


<div>

<h3 className="font-semibold">

{item[0]}

</h3>


<p className="
text-sm
text-gray-500
mt-1
">

{item[1]}

</p>


</div>


<Toggle/>


</div>



{index!==2 &&

<hr className="mt-6"/>

}


</div>


))

}



</div>


</div>


);


}


export default SystemSetting;