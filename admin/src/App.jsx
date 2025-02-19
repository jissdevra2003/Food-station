import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/SideBar/SideBar'
import {Routes,Route} from "react-router-dom";
import Add from './pages/Add/Add.jsx';
import List from './pages/List/List.jsx';
import Orders from './pages/Orders/Orders.jsx';
  import { ToastContainer } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className="app">
<ToastContainer/>
<Navbar/>
<hr />
<div className="app-content">
<Sidebar/>
<Routes>
<Route path="/add" element={<Add/>} />
<Route path="/list" element={<List/>}/>
<Route path="/orders" element={<Orders/>}/>



</Routes>
</div>
</div>
    </>
  )
}

export default App
