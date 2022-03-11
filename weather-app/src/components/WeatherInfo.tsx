import { Row, Col, Card } from "react-bootstrap";
import { IWeather } from "./types/weather";
import { Forecast } from "./types/forecast";
import logo from "../assets/images/pic.png";
import { useState, useEffect } from "react";
interface WeatherInfoProps {
  weather: IWeather;
}

const WeatherInfo = ({ weather }: WeatherInfoProps) => {
  const [forecast, setForecast] = useState<Forecast["daily"]>([]);
  const apiKey: string = "2cd527ed535b15c100079b82e1735bea";

  const fetchForecast = async ({ weather }: WeatherInfoProps) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.lat}&lon=${weather.lon}&exclude=minutely,alert&appid=${apiKey}`
    );
    if (response.ok) {
      const data = (await response.json()) as Forecast;
      console.log("Forecast:", data);
      let onlineForecast = data.daily;
      setForecast(onlineForecast);
    }
  };
  useEffect(() => {
    fetchForecast({ weather });
  }, [weather]);
  return (
    <Row className="px-3">
      {forecast.map((fore, i) => (
        <Col xs={12} md={5} lg={3}>
          <Card className="mt-5 ali text-light" key={i}>
            <Card.Img src={`http://openweathermap.org/img/w/${fore.weather[0].icon}.png`} className="asd"/>
            <Card.Body>
              <Card.Title className="d-flex justify-content-start">
                {weather.name}
              </Card.Title>
              <Card.Text className="d-flex justify-content-end">
                {fore.weather[0].main}
              </Card.Text>
              <Card.Text className="d-flex justify-content-start">
                Morning: {fore.temp.day} C
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default WeatherInfo;
