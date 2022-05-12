import Announcement from '../Components/Announcement'
import React from 'react'
import Categories from '../Components/Categories'
import Navbar from '../Components/Navbar'


const Home = () => {
  return (
    <div>
        
        <Navbar/>
        <Announcement/>
        <Categories/>
    </div>
  )
}

export default Home