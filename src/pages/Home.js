import Announcement from '../Components/Announcement'
import React from 'react'
import Categories from '../Components/Categories'
import Navbar from '../Components/Navbar'
import ProductList from '../Components/ProductList'
import CategoryItem from '../Components/CategoryItem'

const Home = () => {
  return (
    <div>
        
        <Navbar/>
        <Announcement/>
        <Categories/>
        <ProductList/>
        
    </div>
  )
}

export default Home