import React from 'react';
import {Header} from './components'
import {Outlet} from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import {useState} from 'react';

function Layout()
{
const [category,setCategory]=useState("All");

return (
<>
 {/* <Header/>  */}
{/* <Outlet/>  */}
 {/* <ExploreMenu category={category} setCategory={setCategory}/> */}
{/* <Footer/> */}

</>

)
}

export default Layout;