import React, { useEffect, useRef } from 'react'
import './Weather.css'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png' 
import wind from '../assets/wind.png'
import drizle from '../assets/drizzle.png' 
import search from '../assets/search.png'
import humidity from '../assets/humidity.png'  



const Weather = () => {
 
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = React.useState(null);
   const allIcons = {"01d": clear,
                    "01n": clear,
                    "02d": cloud,
                    "02n": cloud,
                    "03d": cloud,
                    "03n": cloud,
                    "04d": cloud,
                    "04n": cloud,
                    "09d": drizle,
                    "09n": drizle,
                    "10d": rain,
                    "10n": rain,
                    "11d": rain,
                    "11n": rain,
                    "13d": snow,
                    "13n": snow,
                    "50d": cloud,
                    "50n": cloud};
 

  const WeatherAPICall = async (city) => {
    console.log("Fetching weather for:", city); 
    if(city ==="" || city == null){
        alert("Please enter a city name");
        return;
    }  
    
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      if(!response.ok){
            alert(data.message);
            setWeatherData(false);
            return;
      }
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({humidity: data.main.humidity, 
                        windSpeed: data.wind.speed, 
                        temperature: Math.floor(data.main.temp), 
                        location: data.name, 
                        icon: icon});
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(false);
    }       

  }    

// run once on mount to show a default city
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  WeatherAPICall(inputRef.current.focus());
}, []);


  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search} alt="search" onClick={() => WeatherAPICall(inputRef.current.value)} />
    </div>
  {weatherData ? <>
   <img src={weatherData.icon} alt="" className='weather-icon' />
  <p className='temperature'>{weatherData.temperature}</p>
  <p className='location'>{weatherData.location}</p>
    <div className="weather-data">
        <div className='col'>
            <img src={humidity} alt="humidity" />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src={wind} alt="" />
            <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
            </div>
        </div>

    </div>
    
    </>: <></>} 
   
    
    </div>
  )
}

export default Weather
