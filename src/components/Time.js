import React from 'react'
import './time.css'
import { format_to_local_time } from '../services/weatherservice'

const Time = ({weather:{dt, timezone, name, country}}) => {
  return (
<div>
      <div className="timelocation">
        <p>{format_to_local_time(dt,timezone)}</p>
    </div>

    <div className="cityname">
        <p>{`${name}, ${country}`}</p>
    </div>

    </div>

  )
}

export default Time
