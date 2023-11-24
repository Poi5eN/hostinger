import React from "react";
import "./Card.css";

import admin from "../../assets/icon/admin2.png";
import student from "../../assets/icon/student.gif";
import teacher from "../../assets/icon/teacher3.jpeg";
import parent from "../../assets/icon/parent.avif";
import card_bg from "../../assets/image/card-background.png";
import bg from "../../assets/image/bg-animated.gif";
import { Link } from "react-router-dom";

const Card = () => {
  const obj = [
    {
      name: "Admin",
      logo: admin,
      bg: card_bg,
      path: "/cardadmin",
    },
    {
      name: "Teacher",
      logo: teacher,
      bg: card_bg,
      path:"/cardteacher"
    },
    {
      name: "Parent",
      logo: parent,
      bg: card_bg,
      path:"/cardparent",
    },
    {
      name: "Student",
      logo: student,
      bg: card_bg,
      path:"/cardstudent",
    },
  ];
  return (
    <>
    
      <div className="Cart_parent py-20">
      <div className="heading sm:text-sm md:text-sm">Our Dashboards
      <div className="underline-card"><span></span></div>
      </div>
        <div className="Cart_child py-20">

          {obj.map((item, index) => (
            <Link to={item.path} key={index}>
              <div className="cardBox">
            <div className="home_card">
              <section className="wrapper">
                <div className="" data-effect="zoom">
                  <figure className="card__image">
                    <img src={bg} alt="Short description" className="card_img" />
                  </figure>
                  <div className="card__header">
                    <figure className="card__profile w-20 h-20">
                      <img
                        className="card_img"
                        src={item.logo}
                        alt="Short description"
                      />
                    </figure>
                  </div>
                  <div className="card__body">
                    <h3 className="text-2xl font-extrabold text-center  h3">
                      {item.name}
                    </h3>
                    <p className="card__job">
                      <span className="material-symbols-outlined card_span">
                        arrow_forward
                      </span>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          </Link>   
            
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Card;




// import "./Card.css";

// import admin from "../../assets/icon/admin2.png";
// import student from "../../assets/icon/student.gif";
// import teacher from "../../assets/icon/teacher3.jpeg";
// import parent from "../../assets/icon/parent.avif";
// import card_bg from "../../assets/image/card-background.png";
// import bg from "../../assets/image/background-card4.avif";

// const Card = () => {
//   const obj = [
//     {
//       name: "Admin",
//       logo: admin,
//       bg: card_bg,
//       path: "/cardpage/cardadmin",
//     },
//     {
//       name: "Teacher",
//       logo: teacher,
//       bg: card_bg,
//       path:"/cardpage/cardteacher"
//     },
//     {
//       name: "Parent",
//       logo: parent,
//       bg: card_bg,
//       path:"/cardpage/cardparent",
//     },
//     {
//       name: "Student",
//       logo: student,
//       bg: card_bg,
//       path:"/cardpage/cardstudent",
//     },
//   ];
//   return (
//     <>
    
//       <div className="Cart_parent py-20">
//       <div className="heading sm:text-sm md:text-sm">Get Started as a ....
//       <div className="underline-card"><span></span></div>
//       </div>
//         <div className="Cart_child py-20">

//           {obj.map((item, index) => (
//             <Link to={item.path} key={index}>
//               <div className="cardBox">
//             <div className="home_card">
//               <section className="wrapper">
//                 <div className="" data-effect="zoom">
//                   <figure className="card__image">
//                     <img src={bg} alt="Short description" className="card_img" />
//                   </figure>
//                   <div className="card__header">
//                     <figure className="card__profile w-20 h-20">
//                       <img
//                         className="card_img"
//                         src={item.logo}
//                         alt="Short description"
//                       />
//                     </figure>
//                   </div>
//                   <div className="card__body">
//                     <h3 className="text-4xl font-extrabold text-center  h3">
//                       {item.name}
//                     </h3>
//                     <p className="card__job">
//                       <span className="material-symbols-outlined card_span">
//                         arrow_forward
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </div>
//           </Link>   
            
//           ))}
//         </div>
//       </div>
      
//     </>
//   );
// };

// export default Card;
