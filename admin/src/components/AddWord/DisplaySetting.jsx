function DisplaySetting(){

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

⚙ Cài đặt hiển thị

</h2>



<div className="
flex
justify-between
items-center
mt-6
">


<div>

<p className="font-semibold">
Trạng thái
</p>

<p className="
text-sm
text-gray-500
">

Công khai trên ứng dụng

</p>

</div>



<input

type="checkbox"

defaultChecked

className="
w-12
h-6
accent-blue-600
"

/>



</div>




<p className="
mt-8
font-semibold
">

Độ khó (Level)

</p>



<div className="
grid
grid-cols-3
gap-3
mt-4
">


{
["A1","A2","B1","B2","C1","C2"].map(level=>(

<button

key={level}

className={`
h-10
rounded-lg
border
font-semibold
${level==="A2"
?"bg-blue-600 text-white"
:"bg-[#F8F9FF]"
}
`}

>

{level}

</button>


))

}



</div>



</div>

);

}


export default DisplaySetting;