import { useState } from 'react'
import './App.css'
import {Route, Routes,useLocation} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import {ToastContainer} from "react-toastify"
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

function App() 
{

const location=useLocation();
const showNavbar=location.pathname!=="/login";


return (
<>
<ToastContainer/>
{showNavbar && <Navbar/>}
<div className="app">

<Routes>
<Route path="/" element={<Home/>} />
<Route path="" element={<Home/>} />
<Route path="/login" element={<LoginPopUp />} />
<Route path="/cart" element={<Cart/>} />
<Route path="/placeOrder" element={<PlaceOrder/>} />
<Route path="/verify" element={<Verify/>}/>
<Route path="/myorders" element={<MyOrders/>}  />


</Routes>
</div>
<Footer/>

</>
)
}

export default App
