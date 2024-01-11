import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Time from './components/Time';
import Temperature from './components/Temperature';
import Forecast from './components/Forecast';
import DailyForecast from './components/DailyForecast';
import sample from "./video3 (1).mp4"
import get_formated_weather_data from './services/weatherservice';
import { useEffect, useState } from 'react';
import sunny from "./sunny.jpg"
import cold from "./cold.jpg"
import rain from "./rain.jpg"
import cloud from "./cloud.jpg"



// import UilReact from '@iconscout/react-unicons/icons/uil-react'

function App() {

const [query, setQuery] = useState({q:"Nagpur"})
const [units, setUnits] = useState('metric')
const [weather, setWeather] = useState(null)


useEffect(() =>{

  const fetch_weather = async()=>{
    await get_formated_weather_data({...query,units}).then(data =>{
      setWeather(data);
    });
    
  };
  
  fetch_weather();

}, [query,units])


const getWeatherCondition = () => {
  const currentWeather = weather?.details?.toLowerCase();

  if (!currentWeather) {
    console.error('Current weather data is undefined or null.');
    return sunny; // Default to sunny image
  }

  console.log('Weather Details:', currentWeather);

  if (currentWeather.includes('sunny') || currentWeather.includes('clear') || currentWeather.includes('clear sky')) {
    return sunny;
  } else if (currentWeather.includes('rain') || currentWeather.includes('thunderstorm') || currentWeather.includes('shower rain')) {
    return rain;
  } else if (currentWeather.includes('cold') || currentWeather.includes('haze') || currentWeather.includes('snow') || currentWeather.includes('mist')) {
    return cold;
  } else if (currentWeather.includes('clouds') || currentWeather.includes('fog') || currentWeather.includes('smoke') || currentWeather.includes('scattered clouds')) {
    return cloud;
  } else {
    console.warn(`Unknown weather type: ${currentWeather}. Defaulting to sunny image.`);
    return sunny;
  }
};


  return (
    <>
    <div className="main-back">
      <video id="main-video" autoPlay loop muted >
        <source src={sample} type="video/mp4"/>
      </video>
    <div className="box">
    <img id="box-img" src={getWeatherCondition()} alt=""/>

    </div>

    <Header setQuery = {setQuery} />
    <Search setQuery ={setQuery}units={units} setUnits={setUnits} />
    

    {weather && (
      <>
      <Time weather={weather}/>
    <Temperature weather={weather}/>

    <Forecast title='hourly forecast' items ={weather.hourly}/>
    <DailyForecast title='daily forecast' items ={weather.daily}/>
 
      </>
    )}
    
    </div>
    </>
  );
}

export default App;
