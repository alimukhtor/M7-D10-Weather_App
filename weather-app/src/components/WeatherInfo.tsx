import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { IWeather } from "./types/weather";
import { Forecast } from "./types/forecast";
import logo from '../assets/images/pic.png'
import {useState, useEffect} from 'react'
interface WeatherInfoProps{
    weather: IWeather
}


const WeatherInfo =({weather}:WeatherInfoProps)=> {
    const [forecast, setForecast] = useState<Forecast["daily"]>([])
    const apiKey: any = "2e9b02965350b65e7874cee2f70d914e";

    const fetchForecast = async({weather}:WeatherInfoProps)=> {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.lat}&lon=${weather.lon}&exclude=minutely&appid=${apiKey}`)
        if(response.ok){
            const data = await response.json() as Forecast
            console.log("Forecast:", data);
            let onlineForecast = data.daily
            setForecast(onlineForecast)
            
        }
    }
    useEffect(()=> {
        fetchForecast({weather})
    }, [])
    return(
        <>
        {
            forecast.map(fore => (
            <>
            <Card.Img src={logo} className="fluid" style={{ objectFit: "cover" }} />
            <Card.Body>
              <Card.Title>{weather.name}</Card.Title>
              <Card.Text>
                {fore.weather[0].main}
              </Card.Text>
            </Card.Body>
            </>
             ))
        }
        </>
    )
}
export default WeatherInfo