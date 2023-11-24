import React from 'react'
import Banner from '../Banner/Banner'
import Carousel from '../Carousel/Carousel'
import Community from '../Community/Community'
import Testimonial from '../Testimonial/Testimonial'
import ContactForm from '../ContactForm/ContactForm'
import Card from '../Card/Card'

const Home = () => {
  return (
   <>
   {/* <h1>hello</h1> */}
   <Banner/>
  
      <Card/>
      <Carousel/>
      <Community/>
      <Testimonial/>
      <ContactForm/>
   </>
  )
}

export default Home