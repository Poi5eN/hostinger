import React, { useState, useEffect } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      name: "AJAY RAJ",
      image:
        "http://nanaetben.fr/animation/assets/images/website/Ben-1.png",
      text:
        "Our school management system has been a transformative tool. It seamlessly handles administrative tasks, empowering our educators to focus on teaching. It's user-friendly,and it has truly elevated our school's operational efficiency.",
    },
    {
      name: "Nitish",
      image:
        "http://nanaetben.fr/animation/assets/images/website/Ben-2.png",
      text:
        "Implementing this management system was a game-changer for our school. It's highly efficient and simplifies tasks for administrators, reducing the learning curve and improving productivity.",
    },
    {
      name: "Sakshi",
      image:
        "https://nanaetben.fr/animation/assets/images/website/Nana-4.png",
      text:
        "This system revolutionized our school's communication and organization. Information flows seamlessly, creating a connected learning community and providing a platform for real-time updates that benefit our students, parents, and staff.",
    },
    {
      name: "Akansha",
      image:
        "https://nanaetben.fr/animation/assets/images/website/Nana-3.png",
      text:
        "An essential tool for modern schools, it's transformed how we manage everything. Our administrative processes, student records, and resource allocation are now more efficient and ensuring we're well-prepared for the future.",
    },
    {
      name: "Poi5eN",
      image:
        "https://nanaetben.fr/animation/assets/images/website/Nana-1.png",
      text:
        "Parents and staff adore the transparency and convenience offered by this system. It empowers parents to monitor their children's progress and school-related updates easily.This system strengthens our school community.",
    },
    {
      name: "Chaya",
      image:
        "https://nanaetben.fr/animation/assets/images/website/Nana-2.png",
      text:
        "Effortlessly managing student data, attendance, and resources, this system is an invaluable asset to our institution. It saves time, optimizes resource allocation, and customizes our educational approach. It's not just a tool.",
    },

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, testimonials.length]);

  return (
    <div className="my-2">
      <h2 className="head3">Testimonials</h2>
      <div className="underline-testimonial">
        <span></span>
      </div>
      <div className="testi-button">
        See more happy faces <span>By clicking on the bubbles</span>
      </div>
      <section className="op-section op-eight-section section" id="">
        <div className="ocean-2">
          <div className="wave-2"></div>
          <div className="wave-2"></div>
        </div>
        <div className="section-eight">
          <div className="col-md-3 col-sm-3">
            <div className="container-pe-quote left">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`pp-quote li-quote-${index + 1} ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={testimonial.image} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="sec-eight-text-area">
              <div className="container-dp-name">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`box-dpname dp-name-${index + 1} ${
                      activeIndex === index ? "look" : "hide-dp-top"
                    }`}
                  >
                    <img src={testimonial.image} alt="" />
                    <h1>{testimonial.name}</h1>
                    <div className="text-para w-[50%] ">
                      <p>{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
