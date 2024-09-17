import React, { useEffect, useState } from 'react'
import * as L from "leaflet"
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';
import { BiLoaderCircle } from "react-icons/bi";
import { LuNavigation2 } from "react-icons/lu";
import { setWeatherData } from '../store/globalSlice';
import getWeather from '../data/getWeather';

// Importing custom marker images
import customMarkerIcon from '/marker.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Creating a custom icon
const customIcon = new L.Icon({
    iconUrl: customMarkerIcon,
    shadowUrl: markerShadow,
    iconSize: [40, 41], // Set the size of the icon
    iconAnchor: [12, 41], // Point where the icon's bottom meets the map
    popupAnchor: [1, -34], // Point where the popup should open relative to the iconAnchor
    shadowSize: [41, 41]
});

const MapWithCentering = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
        if (coords) {
            map.flyTo([coords.lat, coords.lon], 10);  // Recenter map when coordinates change
        }
    }, [coords, map]);

    return <Marker position={[coords.lat, coords.lon]}  icon={customIcon} />;
};


const LocateButton = () => {
    const map = useMap();
    const dispatch = useDispatch()

    const locateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude).then(resp => {
                    dispatch(setWeatherData(resp))
                })
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <button onClick={locateUser} className='absolute top-20 left-3 z-[1000] bg-white border-[1px] border-black p-1 '>
            <LuNavigation2 className='text-xl' />
        </button>
    );
};

const LeafletMap = () => {
    const weatherData = useSelector(state => state.global.weatherData);
    // console.log(weatherData);


    return (weatherData ?
        <MapContainer center={[weatherData.coord.lat, weatherData.coord.lon]} zoom={10} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <MapWithCentering coords={weatherData.coord} />
            <LocateButton />
        </MapContainer>
        : <div className="w-full h-full flex items-center justify-center">
            <BiLoaderCircle className='animate-spin text-4xl text-text1' />
        </div>
    )
}

export default LeafletMap