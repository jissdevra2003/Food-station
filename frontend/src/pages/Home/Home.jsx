import React from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { Header } from '../../components';
import {useState} from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

function Home()
{
const [category,setCategory]=useState("All");
return (
<>
<Header/>
<ExploreMenu category={category} setCategory={setCategory} />
<FoodDisplay category={category} />
</>

)
}
export default Home;