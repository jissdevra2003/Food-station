import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Layout from './Layout'


function App() 
{

return (
<div className="w-4/5 font-serif p-0 m-auto box-border bg-white min-h-screen">
<Navbar/>

<Routes>
<Route path="/" element={<Home/>} />
<Route path="" element={<Home/>} />
<Route path="/cart" element={<Cart/>} />
<Route path="/placeOrder" element={<PlaceOrder/>} />


</Routes>
</div>
)
}

export default App
