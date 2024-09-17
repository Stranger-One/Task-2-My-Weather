import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setWeatherData } from './store/globalSlice';
import getWeather from './data/getWeather';
import { HourlyForecast, LeafletMap, WeatherSearch } from './components';
import { FaTemperatureLow } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
import { TbDroplets } from "react-icons/tb";
import { FaSkyatlas } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { GiWindSlap } from "react-icons/gi";
import { LuNavigation2 } from "react-icons/lu";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const theme = useSelector(state => state.global.theme)
  const weatherData = useSelector(state => state.global.weatherData)
  const dispatch = useDispatch()

  const weatherDetails = {
    temp: weatherData ? (weatherData.main.temp - 272).toFixed(2) : "00",
    main: weatherData ? weatherData.weather[0].main : "Invalid",
    desc: weatherData ? weatherData.weather[0].description : "Description",
    icon: weatherData ? weatherData.weather[0].icon : "10d",
    name: weatherData ? weatherData.name : "Searching...",
    max_temp: weatherData ? (weatherData.main.temp_max - 272).toFixed(2) : "00",
    min_temp: weatherData ? (weatherData.main.temp_min - 272).toFixed(2) : "00",
    sunrise: weatherData ? (new Date(weatherData.sys.sunrise * 1000)).toTimeString().split(" ")[0] : "00",
    sunset: weatherData ? (new Date(weatherData.sys.sunset * 1000)).toTimeString().split(" ")[0] : "00",
    humidity: weatherData ? weatherData.main.humidity : "00",
    pressure: weatherData ? weatherData.main.pressure : "00",
    vis: weatherData ? weatherData.visibility : "00",
    wind: weatherData ? weatherData.wind.speed : "00",
    dir: weatherData ? weatherData.wind.deg : 45
  }

  // Set theme based on localStorage or system preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(savedTheme))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        getWeather(latitude, longitude).then(resp => {
          dispatch(setWeatherData(resp))
        })
      },
      (error) => {
        setError("Unable to retrieve your location");
      }
    );

  }, []);

  // Toggle dark mode and store the preference in localStorage
  const toggleDarkMode = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="w-full h-fit lg:h-screen overflow-auto flex items-center justify-center bg-cover bg-center " style={{
      backgroundImage: "url(/rainy-background.jpg)"
    }}>
      <div className="w-full h-full lg:w-[80%] lg:h-[90%] bg-slate-800/30 backdrop-blur-sm rounded-lg grid grid-cols-2 grid-rows-[50px_250px_200px_150px_150px_150px_200px] lg:grid-cols-5 lg:grid-rows-[9%_29%_29%_29%] p-2 gap-2 ">
        <div className=" hidden lg:block
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full overflow-hidden"></div>
        <div className="h-full
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full col-span-full lg:col-span-3 relative">
          <WeatherSearch />
        </div>
        <div className="hidden lg:block
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full overflow-hidden"></div>
        <div className="
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full col-span-2 lg:row-span-2 overflow-hidden">
          <LeafletMap />
        </div>
        <div className="shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full col-span-2 lg:row-span-2 relative flex items-center justify-center flex-col">
          <h2 className='absolute top-4 left-4 text-[16px] text-text2  font-semibold flex gap-2'><FaTemperatureLow className='text-xl' /> Temperature </h2>

          <div className="absolute top-4 right-4 flex flex-col items-end">
            <p className="text-lg text-text1 font-bold">{weatherDetails.name}</p>
            <p className="text-sm text-text1 font-bold">{weatherDetails.max_temp} ℃ ↑</p>
            <p className="text-sm text-text1 font-bold">{weatherDetails.min_temp} ℃ ↓</p>
          </div>

          <img src={`https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`} alt="" className='w-[80px] ' />
          <h2 className='text-4xl font-semibold flex items-center'>{weatherDetails.temp} ℃ </h2>
          <h2 className='text-lg font-semibold'>{weatherDetails.main}</h2>
          <p className='text-center text-sm leading-tight text-text2 line-clamp-2'>{weatherDetails.desc}</p>
        </div>
        <div className="shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full overflow-hidden relative">
          <h2 className='absolute top-3 left-3 text-[16px] text-text2  font-semibold flex gap-2'><IoMdSunny className='text-xl' /> Morning </h2>
          <div className="absolute w-full bottom-0 grid grid-cols-2 p-2 ">
            <h2 className='leading-5 text-sm'><span className='font-semibold '>Sun rise:</span> <br /> {weatherDetails.sunrise}</h2>
            <h2 className='leading-5 text-sm'><span className='font-semibold '>Sun set:</span> <br />{weatherDetails.sunset}</h2>
          </div>
        </div>
        <div className="
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full overflow-hidden relative flex items-center justify-center">
          <h2 className='absolute top-3 left-3 text-[16px] text-text2  font-semibold flex gap-2'><TbDroplets className='text-xl' /> Humidity </h2>
          <div className="w-full p-2 flex justify-center">
            <h2 className='text-2xl font-semibold'>{weatherDetails.humidity}%</h2>
          </div>
        </div>
        <div className=" rounded-lg h-[170px] max-h-full relative overflow-hidden order-last lg:order-none col-span-2">
          <HourlyForecast />
        </div>

        <div className="
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full overflow-hidden flex items-center justify-center relative ">
          <h2 className='absolute top-3 left-3 text-[16px] text-text2  font-semibold flex gap-2'><MdOutlineVisibility className='text-xl' /> Visibility </h2>
          <div className=" p-2 ">
            <h2 className='text-2xl font-semibold flex items-center '>{weatherDetails.vis} m</h2>
          </div>
        </div>
        <div className="
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full overflow-hidden relative">
          <h2 className='absolute top-3 left-3 text-[16px] text-text2  font-semibold flex gap-2'><FaSkyatlas className='text-xl' /> Pressure </h2>
          <div className=" p-2 flex items-center justify-center h-full">
            <h2 className='text-2xl font-semibold flex items-center '>{weatherDetails.pressure} hpa</h2>
          </div>
        </div>
        <div className="
        shadow-md shadow-black bg-slate-300/30 rounded-lg max-h-full overflow-hidden relative flex items-center justify-center ">
          <h2 className='absolute top-3 left-3 text-[16px] text-text2  font-semibold flex gap-2'><GiWindSlap className='text-xl' /> Wind </h2>
          <h2 className='text-2xl font-semibold flex items-center p-2 '>{weatherDetails.wind} m/s</h2>
          <div className="absolute bottom-0 right-1 p-2 w-10 h-10 rounded-full flex items-center justify-center ">
            <p className='text-sm absolute -top-2 -translate-x-1/2 left-1/2'>N</p>
            <LuNavigation2 className={`text-xl origin-center`} style={{ transform: `rotate(${weatherDetails.dir}deg)` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
