import React from 'react'
import './forecast.css'
import { icon_url_from_code } from '../services/weatherservice'


const Forecast = ({title,items}) => {
  return (
    <div>
      <div className='hourly'>
        <p>{title}</p>
        <hr/>

        <div className='hourly-pred'>

          {items.map((item)=>(

          <div className='hourly-all'>
          <p className='hourly-time'>{item.title}</p>
          <img className='hourly-img' src={icon_url_from_code(item.icon)} alt=""/>
          <p className='hourly-degree'>{`${item.temp.toFixed()}`} °</p>
          </div>

          ))}

          

        </div>
      </div>
<div className='line-seprate'></div>
    </div>
  )
}

export default Forecast
