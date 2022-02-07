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
  const apiKey: any = "2e9b02965350b65e7874cee2f70d914e";

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
  }, []);
  return (
    <Row className="px-3">
      {forecast.map((fore, i) => (
        <Col xs={12} md={5} lg={3}>
          <Card className="mt-5 ali text-light" key={i}>
            <Card.Img src={logo} />
            <Card.Body>
              <Card.Title className="d-flex justify-content-start">
                {weather.name}
              </Card.Title>
              <Card.Text className="d-flex justify-content-end">
                {fore.weather[0].main}
              </Card.Text>
              {/* <Card.Text className="d-flex justify-content-end">{fore.alerts[0].description}</Card.Text> */}
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
