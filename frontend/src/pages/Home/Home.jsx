import React from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import  Header  from '../../components/Header/Header.jsx';
import {useState} from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload.jsx';


function Home()
{
const [category,setCategory]=useState("All");
return (
<>
<Header/>
<ExploreMenu category={category} setCategory={setCategory} />
<FoodDisplay category={category} />
<AppDownload/>




</>


)
}
export default Home;