import { useEffect, useState } from 'react'
import OpenWeather from '../apis/OpenWeather'
import { useGlobalContext } from '../context/context'

const FourDayForecast = () => {

    const { formatTimestamp, toCelsius, place, icons } = useGlobalContext()
    const [forecasts, setForecasts] = useState()

    const getDayOfMonth = (timestamp) => {
        return new Date(timestamp * 1000).getDate()
    }

    const getHourFromTimestamp = (timestamp) => {
        return timestamp.slice(11, 16)
    }

    const extractForecastsByDay = (unfilteredForecasts) => {
        var dayOfMonth = new Date().getDate()
        const filteredForecasts = {
            forecastsToday: [],
            forecastsTomorrow: [],
            forecastsDay3: [],
            forecastsDay4: [],
            forecastsDay5: [],
            forecastsDay6: [],
        }

        for (var dayOfForecasts in filteredForecasts) {

            filteredForecasts[dayOfForecasts] = unfilteredForecasts.filter(forecast => getDayOfMonth(forecast.dt) === dayOfMonth)

            dayOfMonth++
        }

        return filteredForecasts
    }


    useEffect(() => {
        let isMounted = true
        const getForecast = async () => {
            try {
                const response = await OpenWeather.get("/data/2.5/forecast", {
                    params: {
                        lat: place.lat,
                        lon: place.lon,
                    }
                })
                if (isMounted) setForecasts(extractForecastsByDay(response.data.list))
            } catch (error) {
                console.error(error)
            }
        }

        getForecast()
        return () => (isMounted = false)
    }, [place])

    return (
        <div className=''>
            {forecasts && (
                <>
                    {forecasts.forecastsToday.length > 0 &&
                        (<div className="today">
                            <div className='day-text'>Today</div>
                            <div className="forecasts">
                                {forecasts.forecastsToday.map(forecast => {
                                    return (
                                        <div key={forecast.dt} className="forecast">
                                            <div>{getHourFromTimestamp(forecast.dt_txt)}</div>
                                            <div className='forecast-icon'>{icons.get(forecast.weather[0].main)}</div>
                                            <div>{toCelsius(forecast.main.temp)}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>)
                    }

                    <div className="tomorrow">
                        <div className='day-text'>Tomorrow</div>
                        <div className="forecasts">
                            {forecasts.forecastsTomorrow.map(forecast => {
                                return (
                                    <div key={forecast.dt} className="forecast">
                                        <div>{getHourFromTimestamp(forecast.dt_txt)}</div>
                                        <div className='forecast-icon'>{icons.get(forecast.weather[0].main)}</div>
                                        <div>{toCelsius(forecast.main.temp)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="day3">
                        <div className='day-text'>{formatTimestamp(forecasts.forecastsDay3[0].dt)}</div>
                        <div className="forecasts">
                            {forecasts.forecastsDay3.map(forecast => {
                                return (
                                    <div key={forecast.dt} className="forecast">
                                        <div>{getHourFromTimestamp(forecast.dt_txt)}</div>
                                        <div className='forecast-icon'>{icons.get(forecast.weather[0].main)}</div>
                                        <div>{toCelsius(forecast.main.temp)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="day4">
                        <div className='day-text'>{formatTimestamp(forecasts.forecastsDay4[0].dt)}</div>
                        <div className="forecasts">
                            {forecasts.forecastsDay4.map(forecast => {
                                return (
                                    <div key={forecast.dt} className="forecast">
                                        <div>{getHourFromTimestamp(forecast.dt_txt)}</div>
                                        <div className='forecast-icon'>{icons.get(forecast.weather[0].main)}</div>
                                        <div>{toCelsius(forecast.main.temp)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="day5">
                        <div className='day-text'>{formatTimestamp(forecasts.forecastsDay5[0].dt)}</div>
                        <div className="forecasts">
                            {forecasts.forecastsDay5.map(forecast => {
                                return (
                                    <div key={forecast.dt} className="forecast">
                                        <div>{getHourFromTimestamp(forecast.dt_txt)}</div>
                                        <div className='forecast-icon'>{icons.get(forecast.weather[0].main)}</div>
                                        <div>{toCelsius(forecast.main.temp)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {forecasts.forecastsDay6.length > 0 && (
                        <div className="day6">
                            <div className='day-text'>{formatTimestamp(forecasts.forecastsDay6[0].dt)}</div>
                            <div className="forecasts">
                                {forecasts.forecastsDay6.map(forecast => {
                                    return (
                                        <div key={forecast.dt} className="forecast">
                                            <div>{getHourFromTimestamp(forecast.dt_txt)}</div>
                                            <div className='forecast-icon'>{icons.get(forecast.weather[0].main)}</div>
                                            <div>{toCelsius(forecast.main.temp)}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>)
                    }
                </>
            )}
        </div>
    )
}
export default FourDayForecast