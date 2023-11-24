import React from "react";
import "./Carousel.css";
import s1 from "../../assets/image/s1.gif";
import s2 from "../../assets/image/s2.gif";
import s3 from "../../assets/image/s3.gif";
const Carousel = () => {
  return (
    <>
      <h2 className="head2">Community</h2>
      <div className="caro-heading">Nurturing minds, shaping futures, and building a brighter tomorrow together.</div>
      <div className="underline">
        <span></span>
      </div>
      <div className="  " id="services">
        <div className=" flex items-cente justify-center mt-4">
          <figure className="icon-cards ">
            <div className="icon-cards__content">
              <div className="icon-cards__item d-flex align-items-center justify-content-center">
                <img className="rounded-3xl w-[388px]" src={s1} alt="" />
              </div>
              <div className="icon-cards__item d-flex align-items-center justify-content-center">
                <img className="rounded-3xl w-[100%]" src={s2} alt="" />
              </div>

              <div className="icon-cards__item d-flex align-items-center justify-content-center">
                <img className="rounded-3xl w-[388px]" src={s3} alt="" />
              </div>
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Carousel;
