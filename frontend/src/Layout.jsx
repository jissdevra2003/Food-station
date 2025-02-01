import React from 'react';
import {Header} from './components'
import {Outlet} from 'react-router-dom'
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import {useState} from 'react';

function Layout()
{
const [category,setCategory]=useState("All");

return (
<>
{/* <Header/> */}
{/* <Outlet/> */}
{/* <ExploreMenu category={category} setCategory={setCategory}/> */}

</>

)
}

export default Layout;