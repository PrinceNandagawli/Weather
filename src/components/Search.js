import React, { useState } from 'react';
import './search.css';
import { UilSearch, UilLocationPoint, } from '@iconscout/react-unicons';



const Search = ({setQuery,units,setUnits}) => {

const [city,setCity] = useState("")


const handle_Unit_change = (e) =>{
  const selectedUnit = e.currentTarget.name;
  if(units !== selectedUnit) setUnits(selectedUnit);
}
const handle_search_click = () =>{

  if (city!=='') setQuery({q:city})

}

const handle_location_click = () =>{
  if (navigator.geolocation){

    navigator.geolocation.getCurrentPosition((position) =>{

      let lat=position.coords.latitude
      let lon=position.coords.longitude

      setQuery({
        lat,
        lon,
      })
    })
  }
}

  return (
    <div className='search'>
        <div className="search-bar">
          <input value={city} onChange={(e)=>setCity(e.currentTarget.value)} type='text' placeholder="search the city name" className='search-input'/>
          <UilSearch onClick={handle_search_click} id='clear'/>
          <UilLocationPoint onClick={handle_location_click} id='clear1'/>
        </div>

        <div className="temp-degree">
          <button onClick={handle_Unit_change} name='metric'className='cel'>°C</button>
          <p className='mid'>|</p>
          <button onClick={handle_Unit_change} name='imperial' className='far'>°F</button>
        </div>




    </div>
  )
}

export default Search
