import React from 'react'
import "./forecast.css"
import { icon_url_from_code } from '../services/weatherservice'


const DailyForecast = ({title,items}) => {
  return (
    <div>
            <div className='daily'>
        <p>{title}</p>
        <hr/>


        <div className='daily-pred'>
                {items.map((item)=>(

        <div className='daily-all'>
        <p className='daily-time'>{item.title}</p>
        <img className='daily-img' src={icon_url_from_code(item.icon)} alt=""/>
        <p className='daily-degree'>{`${item.temp.toFixed()}`} °</p>
        </div>

        ))}

        </div>

    </div>
    </div>
  )
}

export default DailyForecast
