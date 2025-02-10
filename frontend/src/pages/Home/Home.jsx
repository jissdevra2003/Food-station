import React from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { Header } from '../../components';
import {useState} from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

function Home()
{
const [category,setCategory]=useState("All");
return (
<>
<Navbar/>
<Header/>
<ExploreMenu category={category} setCategory={setCategory} />
<FoodDisplay category={category} />
<AppDownload/>




</>


)
}
export default Home;