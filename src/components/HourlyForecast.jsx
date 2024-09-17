import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import { useSelector } from 'react-redux';

const HourlyForecast = () => {
    const weatherData = useSelector(state => state.global.weatherData);
    const data = weatherData ? weatherData.list : []
    // console.log(data);
    return (
        <Swiper
            slidesPerView={3.7}
            spaceBetween={8}
            modules={[FreeMode]}
            className="mySwiper p-2 h-full"// Ensure the Swiper container fits the parent
        >
            {data.length > 0 && data.map((item, index) => (
                <SwiperSlide key={index} className="rounded-lg shadowcss overflow-hidden ">
                    <div className="flex w-full flex-col justify-between h-full p-2 shadow-md shadow-black bg-slate-300/30">
                        <p className='text-sm'>{(item.dt_txt).split(' ')[0].replace('-', '/').replace('-', '/')}</p>
                        <p className='text-sm font-bold'>{(item.dt_txt).split(' ')[1]}</p>
                        <h2 className='text-lg font-semibold'>{(item.main.temp - 272).toFixed(2)} ℃</h2>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" className='w-[60px] ' />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default HourlyForecast