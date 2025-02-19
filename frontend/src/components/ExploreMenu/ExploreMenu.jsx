import React from 'react';
import {menu_list} from '../../assets/assets'
import './ExploreMenu.css'

function ExploreMenu({
category,
setCategory
})
{
return (
<div //explore-menu
className="explore-menu"
id="explore-menu"
>
<h1
className="font-black text-cyan-900"
>Find your favorite food here...</h1>
<p //explore-menu-text
className="w-full font-semibold"
>Enjoy our delicious and mouth-watering dishes, crafted to delight your taste buds.</p>
<div  //explore-menu-list
className="explore-menu-list"
   style={{
        WebkitScrollbar: {
          display: 'none',
        },
        msOverflowStyle: 'none',  /* For Internet Explorer and Edge */
        scrollbarWidth: 'none',   /* For Firefox */
      }}
>
{menu_list.map((item,index)=>{
return (
<div  key={index} //explore-menu-list-item
onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}
className=''
>
<img 
className={`${category===item.menu_name ? "active border-4 border-solid" : ""} w-[7.5vw] min-w-[80px] rounded-[50px] transition-transform duration-300 ease-in-out cursor-pointer`} 
style={{borderColor: 'grey'}} 
src={item.menu_image} 
onClick={e => e.currentTarget.classList.toggle('scale-105')} 
/>
<p
className="mt-10 text-[max(1.4vw,16px)] cursor-pointer text-zinc-700"
>{item.menu_name}</p>
</div>

)

})}

</div>
<hr
className="my-5 mb-2 h-[2px] border-none bg-gray-400"
/>
</div>
)
}

export default ExploreMenu;