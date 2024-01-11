import React from 'react';
import './header.css';

const Header = ({setQuery}) => {

    const cities=[
        {
        id:1,
        title:"Mumbai"
        },
        {
        id:2,
        title:"Pune"
        },
        {
        id:3,
        title:"Nagpur"
        },
        {
        id:4,
        title:"Raipur"
        },
        {
        id:5,
        title:"Delhi"
        },
    ]


  return (
    <div className="city">
        {cities.map((city)=>(

            <button onClick={() => setQuery({q:city.title})} key={city.id} className='city-btn'>{city.title}</button>
        ))}
    </div>
  )
}

export default Header
