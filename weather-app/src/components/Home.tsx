import { Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { IWeather } from "./types/weather";
import WeatherInfo from "./WeatherInfo";
const Home = () => {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState<IWeather[]>([]);
  const apiKey: string = "2cd527ed535b15c100079b82e1735bea";
  const fetchWeatherInfo = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Info", data);
        setWeatherInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherInfo(city);
  }, [city]);

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <h1 className="text-light">
          <strong>Discover the weather</strong>
        </h1>
        <Col xs={12} md={12} lg={8}>
          <Form>
            <Form.Group>
              <Form.Control
                className="rounded-pill mt-2"
                type="search"
                placeholder="Search by city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
        {weatherInfo.map((weather, i) => (
          <WeatherInfo weather={weather} key={i}/>
        ))}
    </Container>
  );
};

export default Home;
