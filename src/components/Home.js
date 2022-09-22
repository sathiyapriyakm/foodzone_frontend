import React from 'react'
import Announcement from './Announcement'
import Categories from './Categories'
import CategoryAnnouncement from './CategoryAnnouncement'
import Footer from './Footer'
import NavBar from "./NavBar"
import Slider from './Slider'

function Home() {
  return (
    <div>
        <NavBar/>
        <Announcement/>
        <Slider />
        <CategoryAnnouncement/>
        <Categories />
        <Footer/>
    </div>
  )
}

export default Home