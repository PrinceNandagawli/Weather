import React from 'react'
import './Temperature.css'
import { icon_url_from_code } from '../services/weatherservice'
import { UilTemperatureHalf,UilWind,UilTear,UilEye ,UilCompressV } from '@iconscout/react-unicons';

const Temperature = ({weather:{
  details,icon,temp,temp_min,temp_max,speed,humidity,feels_like,visibility,uvi,pressure,timezone
}}) => {
  return (
    <div>
      <div className="degree">
        <p>{`${temp.toFixed()}`}°</p>
      </div>

      <div className='icon-weather'>
          <img src={icon_url_from_code(icon)} id='sun' alt=""/>
          
          <h4 id='type'>{details}</h4>
          
        </div>

        <div className="temp">
        <UilTemperatureHalf className='tempicon' />
        <h2 className='words'>Real Feel:</h2>
        <span className='number'>{`${feels_like.toFixed()}`} °</span>
        <UilTear className='tempicon' />
        <h2 className='words'>Humidity:</h2>
        <span className='number1'>
        {`${humidity.toFixed()}`} %
        </span>
        <UilWind  className='tempicon' />
        <h2 className='words'>Wind Speed:</h2>
        <span className='number2'>
        {`${speed.toFixed()}`} Km/h
        </span>
        <UilEye className='tempicon'/>
        <h2 className='words'>visibility:</h2>
        <span className='number3'>
          {visibility !== undefined && !isNaN(visibility) ? `${(visibility / 1000).toFixed(visibility % 1 === 0 ? 0 : 2)}` : 'N/A'} Km
        </span>
        <UilCompressV className='tempicon'/>
        <h2 className='words'>Air Pressure:</h2>
        <span className='number4'>
        {`${pressure}`} hPa
        </span>

        
      </div>

    </div>
  )
}

export default Temperature
