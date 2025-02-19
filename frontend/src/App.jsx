import { useState } from 'react'
import './App.css'
import {Route, Routes,useLocation} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'


function App() 
{

const location=useLocation();
const showNavbar=location.pathname!=="/login";


return (
<>

{showNavbar && <Navbar/>}
<div className="app">

<Routes>
<Route path="/" element={<Home/>} />
<Route path="" element={<Home/>} />
<Route path="/login" element={<LoginPopUp />} />
<Route path="/cart" element={<Cart/>} />
<Route path="/placeOrder" element={<PlaceOrder/>} />


</Routes>
</div>
<Footer/>

</>
)
}

export default App
