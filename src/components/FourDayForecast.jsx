import { useEffect, useState } from 'react'
import OpenWeather from '../apis/OpenWeather'

const FourDayForecast = () => {

    const [forecast, setForecast] = useState()

    useEffect(() => {
        const getForecast = async () => {
            try {
                const response = await OpenWeather.get("/forecast", {
                    params: {
                        lat: 53.23,
                        lon: -6.12,
                    }
                })
                console.log(response)
                setForecast(response)
            } catch (error) {
                console.error(error)
            }
        }
        getForecast()
    }, [])

    return (
        <div></div>
    )
}
export default FourDayForecast