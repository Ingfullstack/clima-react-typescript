import { useMemo, useState } from "react";
import { SearchType, Weathear, WeathearSchema } from "../types"
import axios from 'axios';

const initialState = {
    name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
}

export const useWeather = () => {

    const [weathear, setWeathear] = useState<Weathear>(initialState);
    const [loading, setLoading] = useState(false);
    const [noFound, setNoFound] = useState(false);
    const appId = import.meta.env.VITE_API_KEY;

    const fetchWeather = async (search:SearchType) => {
        
        try {
            setLoading(true)
            setWeathear(initialState)
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const {data} = await axios(geoUrl);
            if (!data[0]) {
                setNoFound(true);
                return;
            }
            setNoFound(false)
            const lat = data[0].lat;
            const lon = data[0].lon;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
            const {data: wetherResult} = await axios(url);
            const result = WeathearSchema.safeParse(wetherResult);
            if (result.success) {
                setWeathear(result.data);
            }

        } catch (error) {
            
        }finally{
            setLoading(false);
        }
    }

    const hasWeatherData = useMemo(() => weathear.name ,[weathear]);

    return{
        fetchWeather,
        loading,
        noFound,
        weathear,
        hasWeatherData
    }
}