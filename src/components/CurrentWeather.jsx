import { useEffect } from 'react'
import OpenWeather from '../apis/OpenWeather'
import { useGlobalContext } from '../context/context'

const CurrentWeather = () => {

    const {
        formatTimestamp, formatTemperature, place, countryCodes,
        currentWeather, setCurrentWeather, icons } = useGlobalContext()

    useEffect(() => {
        const getCurrentWeather = async () => {
            try {
                const response = await OpenWeather.get("/data/2.5/weather", {
                    params: {
                        lat: place.lat,
                        lon: place.lon,
                    }
                })
                setCurrentWeather(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getCurrentWeather()
    }, [place])

    return (
        <div className='current-weather'>
            {currentWeather && (
                <>
                    <div className='temperature'>{formatTemperature(currentWeather.main.temp)}</div>
                    <div className="time-location">
                        <p className='location'>{currentWeather.name}, {countryCodes.get(currentWeather.sys.country)}</p>
                        <p className='time'>{formatTimestamp(currentWeather.dt)}</p>
                    </div>
                    <div className="weather">
                        <div className='weather-icon'>{icons.get(currentWeather.weather[0].main)}</div>
                        <p className='weather-description'>{currentWeather.weather[0].description}</p>
                    </div>
                    
                </>
            )}
        </div>
    )
}
export default CurrentWeather