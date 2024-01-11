import { DateTime } from "luxon";

// const API_KEY = "8ecb939f3e200cac677a1ac614bebd12"
const API_KEY = "bd5e378503939ddaee76f12ad7a97608"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const get_weather = (infoType , searchParams) =>{
    const url =new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams,appid:API_KEY})

    return fetch(url).then((res) => res.json());
};

const format_current_weather = async (data)=>{
    const {
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity,pressure},
        name,
        dt,
        visibility,
        sys: {country, sunrise , sunset},
        weather,
        wind:{speed}
    } = data;

    const { main: details, icon } = weather && weather.length >= 1 ? weather[0] : {};



    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,visibility,pressure,name,dt,country, sunrise , sunset,details,icon,speed};
};

const format_forecast_weather = (data) =>{
    let {timezone , daily ,hourly} = data;

    
    
    hourly = hourly.slice(0,10).map((d) =>{
        
        return {
            title : format_to_local_time(d.dt,timezone,'hh:mm a'),
            temp : d.temp,
            icon : d.weather[0].icon
        }
    })

    daily = daily.slice(0,8).map((d) =>{

        return {
            title : format_to_local_time(d.dt,timezone,'ccc'),
            temp : d.temp.day,
            icon : d.weather[0].icon
        }

    })
    console.log('Raw API Response:', data);

    
    return {timezone,daily,hourly}
}

const get_formated_weatherdata= async (searchParams) =>{
    const formated_current_weather = await get_weather('weather' , searchParams).then(format_current_weather);    

    const {lat , lon } = formated_current_weather;
    const formated_forecast_weather = await get_weather("onecall" , {
        lat , lon , exclude:"current,minutely,alerts" , units: searchParams.units,
    }).then(format_forecast_weather)

    return {...formated_current_weather,...formated_forecast_weather}
}


const format_to_local_time = (secs , zone ,format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


const icon_url_from_code = (code) => {
        const suffix = code.includes('n') ? '' : 'd';
        return `https://openweathermap.org/img/wn/${code.replace('d', '')}${suffix}@2x.png`;

};


export default get_formated_weatherdata

export {format_to_local_time,icon_url_from_code}