import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { IWeather } from "./types/weather";
import WeatherInfo from "./WeatherInfo";
const Home = () => {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState<IWeather[]>([]);
  const apiKey: any = "2e9b02965350b65e7874cee2f70d914e";
  const fetchWeatherInfo = async (city: string) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
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
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={8}>
          <Card className="mt-5 ali text-light">
            {weatherInfo.map((weather) => (
             <WeatherInfo weather={weather}/>
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
