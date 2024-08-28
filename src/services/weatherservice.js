import { DateTime } from "luxon";

const API_KEY = "1966d15592d142108eb174141241308 "
const BASE_URL = "https://api.weatherapi.com/v1"

const get_weather = (type, searchParams) => {
    const url = new URL(`${BASE_URL}/${type}.json`);
    url.search = new URLSearchParams({ key: API_KEY, ...searchParams });
  
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        return data;
      });
};

const format_current_weather = (data) => {
    const {
        location: { lat, lon, name, country, tz_id },
        current: { temp_c, temp_f, feelslike_c, feelslike_f, humidity, pressure_mb, vis_km, uv, wind_kph, last_updated_epoch, condition }
    } = data;

    return {
        lat, lon, 
        temp: temp_c,
        feels_like: feelslike_c,
        humidity,
        pressure: pressure_mb,
        name,
        dt: last_updated_epoch,
        country, 
        visibility: vis_km,
        details: condition.text,
        icon: condition.icon,
        speed: wind_kph,
        timezone: tz_id
    };
};

const format_forecast_weather = (data) => {
    const { forecast, location } = data;
    const timezone = location.tz_id;

    const hourly = forecast.forecastday[0].hour.slice(0, 10).map((h) => ({
        title: format_to_local_time(h.time_epoch, timezone, 'hh:mm a'),
        temp: h.temp_c,
        icon: h.condition.icon
    }));

    const daily = forecast.forecastday.map((d) => ({
        title: format_to_local_time(d.date_epoch, timezone, 'ccc'),
        temp: d.day.avgtemp_c,
        icon: d.day.condition.icon
    }));

    return { timezone, daily, hourly };
};

const get_formated_weatherdata = async (searchParams) => {
    const data = await get_weather('forecast', { ...searchParams, days: 7 });
    const formated_current_weather = format_current_weather(data);
    const formated_forecast_weather = format_forecast_weather(data);

    return {...formated_current_weather, ...formated_forecast_weather}
}

const format_to_local_time = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => 
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const icon_url_from_code = (code) => {
    return `https:${code}`;
};

export default get_formated_weatherdata

export { format_to_local_time, icon_url_from_code }