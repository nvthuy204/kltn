function WordInfo(){

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
        text-[#0B1C30]
        border-b
        pb-4
      ">
        🌐 Thông tin từ vựng
      </h2>



      <div className="
        grid
        grid-cols-2
        gap-5
        mt-6
      ">


        <div>

          <label className="text-sm font-semibold">
            Từ vựng (Word) *
          </label>

          <input

            placeholder="Ví dụ: Serendipity"

            className="
              mt-2
              w-full
              h-12
              rounded-lg
              border
              px-4
              bg-[#F8F9FF]
            "

          />

        </div>




        <div>

          <label className="text-sm font-semibold">
            Phát âm (Pronunciation)
          </label>


          <input

            placeholder="/ˌserənˈdipədē/"

            className="
              mt-2
              w-full
              h-12
              rounded-lg
              border
              px-4
              bg-[#F8F9FF]
            "

          />

        </div>



      </div>




      <div className="mt-6">


        <label className="text-sm font-semibold">
          Nghĩa của từ (Meaning) *
        </label>


        <textarea

          rows="4"

          placeholder="Nhập nghĩa của từ..."

          className="
            mt-2
            w-full
            rounded-lg
            border
            p-4
            bg-[#F8F9FF]
          "

        />


      </div>


    </div>

  );

}


export default WordInfo;