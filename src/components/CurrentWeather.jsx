import { useEffect, useState } from 'react'
import OpenWeather from '../apis/OpenWeather'

const CurrentWeather = () => {

    const [currentWeather, setCurrentWeather] = useState()

    const formatTimestamp = (UNIXTimestamp) => {
        const formattedTimestamp = new Date(UNIXTimestamp * 1000).toUTCString()
        return formattedTimestamp
    }

    useEffect(() => {
        const getCurrentWeather = async () => {
            try {
                const response = await OpenWeather.get("/weather", {
                    params: {
                        lat: 53.23,
                        lon: -6.12,
                    }
                })
                console.log(response.data);
                setCurrentWeather(response.data)
            } catch (error) {
                console.error(error);
            }

        }
        getCurrentWeather()
    }, [])

    return (
        <div>
            {currentWeather && (
                <div>
                    <p>{currentWeather.name}</p>
                    <p>{currentWeather.weather[0].description}</p>
                    <p>Temp: {currentWeather.main.temp}</p>
                    <p>min: {currentWeather.main.temp_min}</p>
                    <p>max: {currentWeather.main.temp_max}</p>
                    <p>Time: {formatTimestamp(currentWeather.dt)}</p>
                    <p>Sunrise: {formatTimestamp(currentWeather.sys.sunrise)}</p>
                    <p>Sunset: {formatTimestamp(currentWeather.sys.sunset)}</p>
                </div>
            )}
        </div>
    )
}
export default CurrentWeather