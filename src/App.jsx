import './App.css'
import CurrentWeather from './components/CurrentWeather'
import FourDayForecast from './components/FourDayForecast'
import Search from './components/Search'
import { useGlobalContext } from './context/context'

function App() {

  const { backgroundImage, currentWeather } = useGlobalContext()

  return (
    <div style={{ background: `url(${backgroundImage}) no-repeat`, height: "100vh" }}>
      <div className="container">
        <div className='main'>
          <CurrentWeather />
        </div>
        <div className='sidebar'>
          <Search />
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
          <FourDayForecast />
        </div>
      </div>
    </div>
  )
}

export default App
