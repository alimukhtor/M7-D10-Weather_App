import { Row, Col, Container } from "react-bootstrap";
import { IWeather } from "./types/weather";
import { Forecast } from "./types/forecast";

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
    <Container>
      <h3 className="mt-5 text-info">{weather.name}</h3>
      <Row className="mb-5">
      
        {forecast.slice(0, 1).map((current) => (
          <>
            <Col xs={12} md={4}>
          <h3 className="mt-5 text-light">Today</h3>
              <img
                src={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
                alt="icon"
                style={{ width: "250px", height: "250px" }}
              />
              <p className="text-light mb-5" style={{ fontSize: "30px" }}>
                <strong>{current.weather[0].main}</strong>
              </p>
            </Col>
            <Col md={4}>
              <h3 className="text-light temp" style={{ fontSize: "55px" }}>
                {current.temp.day}&deg; C
              </h3>
            </Col>
            <Col md={4}>
              <div className="text-light details">
                <p>Description : {current.weather[0].description}</p>
                <p>Wind_Speed : {current.wind_speed}kmph</p>
                <p>Pressure : {current.pressure}mb</p>
              </div>
            </Col>
          </>
        ))}
      </Row>

      <Row>
        {forecast.slice(0, 7).map((detail) => {
          let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          var d = new Date(detail.dt * 1000);
          var dayName = days[d.getDay()];
          console.log("MyDays",dayName);
          return(
          <Col xs={6} md={2}>
            <h6 className="text-light">
              <span className="text-info">{dayName}</span>
            </h6>
            <img
              src={`http://openweathermap.org/img/w/${detail.weather[0].icon}.png`}
              alt="icon"
              style={{ width: "100px", height: "100px" }}
            />
            <p className="text-light mb-5" style={{ fontSize: "15px" }}>
              <strong>{detail.weather[0].main}</strong>
            </p>
            <h3 className="text-light m-5" style={{ fontSize: "15px" }}>
              {detail.temp.day}&deg; C
            </h3>
          </Col>
          )
        })}
      </Row>
    </Container>
  );
};
export default WeatherInfo;
