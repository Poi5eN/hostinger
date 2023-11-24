import "./About.css";
import Shikha from '../../../assets/image/Shikha.png';
import amanimg from '../../../assets/images/amanimg.jpeg';
import annadimg from '../../../assets/images/annadimg.jpg';
import praveenimg from '../../../assets/images/praveenimg.jpeg';
import quoteIcon from '../../../assets/images/quoteIcon.png';
import ajayimage from '../../../assets/images/ajayimage.jpeg'



// import teachimg from "../../../assets/images/teachimg.jpeg"
// import parentimg from "../../../assets/images/parentimg.jpg"
// import studentAnimation from "../../../assets/images/studentAnimation.gif"
// import adminimg from "../../../assets/images/adminimg.jpg"

const About = () => {
  // const cardsData = [
  //   {
  //     title: "Aman",
  //     imageSrc: amanimg,
  //   },

  //   {
  //     title: "Annad",
  //     imageSrc: annadimg ,
  //   },
  //   {
  //     title: "Ajay",
  //     imageSrc: ajayimage,
  //   },
  //   {
  //     title: "Praveen",
  //     imageSrc: praveenimg,
  //   },
  // ];
  return (
    <div class="about-container">
      <div class="profile-image">
        <img src={Shikha} alt="" /> {/* Updated image path */}
      </div>

      <div class="description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque a
          quam nulla ipsa natus quisquam!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ex
          odit tenetur alias expedita impedit in veritatis mollitia ipsam quae
          et quia, deleniti facere praesentium sunt assumenda earum saepe
          aperiam ullam sit. Tempora animi maxime a velit soluta laboriosam quo!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, tempora!
        </p>
      </div>

      <div class="projects-container">
        {/* Rest of your code */}
      </div>

      <h2 class="our-team-heading">Our Team</h2>

      {/* <div class="our-team">
        <div class="team-member">
          <img src={amanimg} alt="" />
          <div class="designation">
            <strong>Aman</strong> (Project Manager)
          </div>
        </div>

        <div class="team-member">
          <img src={annadimg} alt="" />
          <div class="designation">
            <strong>Anand</strong> (Lead Designer)
          </div>
        </div>

        <div class="team-member">
          <img src={ajayimage} alt="" className="w-[100rem]" />
          <div class="designation">
            <strong>Ajay</strong> (Lead Programmer)
          </div>
        </div>

        <div class="team-member">
          <img src={praveenimg} alt="" />
          <div class="designation">
            <strong>Praveen</strong> (Backend Developer)
          </div>
        </div>
      </div> */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1" >
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

  </div> */}

      {/* CARDS ---- OUR TEAM */}
      {/* <div className="grid grid-cols-1  lg:grid-cols-4 gap-4  sm:grid-cols-4 "> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:px-20" >
        <div className="text-center shadow-lg rounded">
          <div className="overflow-hidden relative w-full h-full">
            <img src={amanimg} alt="Team Member 1" className="h-full hover:scale-125 duration-1000" />
            <div class="designation absolute bottom-6 bg-white p-3 rounded-r-2xl shadow-md text-sm">
              <strong>Aman</strong> (Project Manager)
            </div>
          </div>
        </div>


        <div className="text-center shadow-lg rounded ">
          <div className="overflow-hidden relative  w-full h-full">
            <img src={annadimg} alt="Team Member 1" className=" h-full hover:scale-125 duration-1000" />
            <div class="designation absolute bottom-6 bg-white p-3 rounded-r-2xl shadow-md text-sm">
              <strong>Anand</strong> (Lead Designer)
            </div>
          </div>

        </div>
        <div className="text-center shadow-lg rounded">
          <div className="overflow-hidden relative  w-full h-full">
            <img src={ajayimage} alt="Team Member 1" className=" h-full hover:scale-125 duration-1000" />
            <div class="designation absolute bottom-6 bg-white p-3 rounded-r-2xl shadow-md text-sm">
              <strong>Ajay</strong> (Lead Programmer)
            </div>
          </div>

        </div>
        <div className="text-center shadow-lg rounded">
          <div className="overflow-hidden relative  w-full h-full">
            <img src={praveenimg} alt="Team Member 1" className=" h-full hover:scale-125 duration-1000" />
            <div class="designation absolute bottom-6 bg-white p-1 rounded-r-2xl shadow-md text-sm">
              <strong>Praveen</strong> (Lead Programmer)
            </div>
          </div>

        </div>
      </div>


      <div class="our-mission">
        <img class="quote-icon" src={quoteIcon} alt="" /> {/* You may want to update this path too */}
        <p>Our mission is to provide the best services to our clients.</p>
      </div>
    </div>
  );
}

export default About;
