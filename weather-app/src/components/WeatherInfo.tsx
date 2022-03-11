import { Row, Col, Card, Container } from "react-bootstrap";
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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.lat}&lon=${weather.lon}&units=metric&exclude=minutely,alert&appid=${apiKey}`
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
    // <Row className="px-3">
    //   {forecast.map((fore, i) => (
    //     <Col xs={12} md={5} lg={3}>
    //       <Card className="mt-5 ali text-light" key={i}>
    //         <Card.Img src={`http://openweathermap.org/img/w/${fore.weather[0].icon}.png`} className="asd"/>
    //         <Card.Body>
    //           <Card.Title className="d-flex justify-content-start">
    //             {weather.name}
    //           </Card.Title>
    //           <Card.Text className="d-flex justify-content-end">
    //             {fore.weather[0].main}
    //           </Card.Text>
    //           <Card.Text className="d-flex justify-content-start">
    //             Morning: {fore.temp.day} C
    //           </Card.Text>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   ))}
    // </Row>

    <Container>
      <h3 className="mt-5 text-light">{weather.name}</h3>
      {forecast.map((detail) => (
        <Row>
          <Col md={4}>
            <img
              src={`http://openweathermap.org/img/w/${detail.weather[0].icon}.png`}
              alt="icon"
              style={{ width: "200px", height: "200px" }}
            />
            <p className="text-light">
              <strong>{detail.weather[0].main}</strong>
            </p>
          </Col>
          <Col md={4}>
            <h3 className="text-light temp">{detail.temp.day}&deg; C</h3>
          </Col>
          <Col md={4}>
            <div className="text-light details">
              <p>Description : {detail.weather[0].description}</p>
              <p>Wind_Speed : {detail.wind_speed}kmph</p>
              <p>Pressure : {detail.pressure}mb</p>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
export default WeatherInfo;
