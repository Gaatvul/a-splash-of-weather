import Search from './Search'
import FourDayForecast from './FourDayForecast'
import { useGlobalContext } from '../context/context'

const Sidebar = () => {

    const { currentWeather, bgInfo, isCelsius, setIsCelsius } = useGlobalContext()

    return (
        <div className='sidebar'>
            <Search />
            <div className="unit-choice">
                <span>°C</span>
                <label className="switch">
                    <input type="checkbox"></input>
                    <span className="slider" onClick={() => setIsCelsius(!isCelsius)}></span>
                </label>
                <span>°F</span>
            </div>
            <div className="current-weather-details">
                {currentWeather && (
                    <>
                        <div><b>Weather Details</b></div>
                        <div className='cloudiness'><span>Cloudiness:</span> <span>{currentWeather.clouds.all}%</span></div>
                        <div className='humdity'><span>Humidity:</span> <span>{currentWeather.main.humidity}%</span></div>
                        <div className='wind'><span>Wind:</span> <span>{currentWeather.wind.speed} m/s</span></div>
                    </>
                )}
            </div>
            <div className="bg-info">
                <span>Photo by </span>
                <a href={`${bgInfo?.user.links.html}?utm_source=a_splash_of_weather&utm_medium=referral`} target="_blank"> {bgInfo?.user.name}</a>
                <span> on </span>
                <a href={`${bgInfo?.links.html}?utm_source=a_splash_of_weather&utm_medium=referral`} target="_blank">UnSplash</a>
            </div>
            <FourDayForecast />
        </div>
    )
}
export default Sidebar