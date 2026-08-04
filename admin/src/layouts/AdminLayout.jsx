import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar/Sidebar";


function AdminLayout({ children }) {


  const [openMenu, setOpenMenu] = useState(false);



  return (

    <div className="
      flex
      min-h-screen
      bg-[#F5F8FF]
    ">


      {/* Sidebar */}

      <Sidebar

        open={openMenu}

        closeMenu={() => setOpenMenu(false)}

      />



      {/* Overlay mobile */}

      {
        openMenu && (

          <div

            onClick={() => setOpenMenu(false)}

            className="
              fixed
              inset-0
              bg-black/30
              z-40
              md:hidden
            "

          />

        )
      }




      {/* Content */}

      <main

        className="
          flex-1

          min-h-screen

          overflow-y-auto

          px-4
          py-5

          md:px-10
          md:py-8

          md:ml-[280px]
        "

      >


        {/* Mobile Header */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-5

            md:hidden
          "
        >

          <button

            onClick={() => setOpenMenu(true)}

            className="
              rounded-xl
              bg-white
              p-3
              shadow
              text-[#1557C0]
            "

          >

            <FaBars size={22}/>


          </button>



          <h1
            className="
              text-2xl
              font-bold
              text-[#1557C0]
            "
          >

            LingoVerse

          </h1>


        </div>



        {children}


      </main>


    </div>

  );

}


export default AdminLayout;