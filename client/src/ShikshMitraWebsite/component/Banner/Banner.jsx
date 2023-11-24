import React, { useState } from "react";
import Modal from 'react-modal';
import gif from "../../assets/sms.gif";
import teachimg from "../../assets/images/teachimg.jpeg"
import parentimg from "../../assets/images/parentimg.jpg"
import studentAnimation from "../../assets/images/studentAnimation.gif"
import adminimg from "../../assets/images/adminimg.jpg"

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Data for the cards
  const cardsData = [
    {
      title: "Admin",
      imageSrc: adminimg,
    },

    {
      title: "Parent",
      imageSrc: parentimg,
    },
    {
      title: "Teacher",
      imageSrc: teachimg,
    },
    {
      title: "Student",
      imageSrc: studentAnimation,
    },
  ];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <div class="relative ">
        <img src={gif} alt="" className="object-cover w-full  h-screen " />
        <div class="absolute inset-0 bg-black opacity-0"></div>
        <div class="absolute inset-0 flex items-center justify-start">
          <div className=" grid-cols-1 mr-5">
            <h1 class="text-[red] text-5xl font-bold pl-10">
              Empowering Education{" "}
            </h1>
            <h1 class=" text-[32px] font-bold text-center text-[green]">
              Simplifying Administration.
            </h1>
            <div className="flex pl-40">
              <button
                onClick={openModal}
                class="relative top-5 left-16 inline-flex items-center justify-center p-0.5 mb-2 mr-2 
            overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
            bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500
             hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200
              dark:focus:ring-cyan-800">
                <span class="relative px-5 py-2.5 transition-all ease-in 
              duration-75 bg-[cyan-500] dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-sm font-bold">
                  Get Started
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1" >
          {cardsData.map((card, index) => (
            <div key={index} >
           <div className="text-center shadow-lg rounded">
                <div className="overflow-hidden">
                  <img src={card.imageSrc} alt={card.title} className="hover:scale-125 duration-1000" />
                </div>
                <h3 className="py-2 text-xl">{card.title}</h3>
              </div>

            </div>

          ))}

        </div>

        <div className="flex items-center justify-center  ">
          <button className=" py-2 px-2 mt-3 border-2 bg-sky-400  shadow-lg overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
            bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500
             hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200
              dark:focus:ring-cyan-800" onClick={closeModal}>Close Modal
          </button>

        </div>



        {/* <div  className="grid grid-cols-4 lg:grid-cols-4 gap-1  sm:grid-cols-2 " >
          {cardsData.map((card, index) => (
            <div key={index} >


  <div className="text-center shadow-lg rounded">
    <div className="overflow-hidden">
      <img src={card.imageSrc} alt={card.title} className="hover:scale-125 duration-1000"/>
      </div>
    <h3 className="py-2 text-xl">{card.title}</h3>
  </div>
  
  </div>
          
          ))}
        
        </div> */}

        {/* <div className="flex items-center justify-center  ">
    <button className=" py-2 px-2 mt-3 border-2 bg-sky-400  shadow-lg overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
            bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500
             hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200
              dark:focus:ring-cyan-800" onClick={closeModal}>Close Modal
    </button>
              
    </div> */}

      </Modal>
    </>
  );
}

export default Header;
