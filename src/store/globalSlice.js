import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: "global",
    initialState:{
        loading: false,
        theme: "light",
        weatherData: false
    },
    reducers:{
        setLoading: (state, action) =>{
            state.loading = action.payload
        },
        setTheme: (state, action) =>{
            state.theme = action.payload
        },
        setWeatherData: (state, action) =>{
            state.weatherData = action.payload
        }
    }
})

export const {setLoading, setTheme, setWeatherData} = globalSlice.actions;
export default globalSlice.reducer;