import { Container, Row, Col, Form } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <h1 className="text-light"><strong>Hello Arian, Discover the weather</strong></h1>
        <Col xs={12} md={12} lg={8}>
          <Form>
            <Form.Group>
              <Form.Control className="rounded-pill mt-2" type="search" placeholder="Search herre..." />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
          
      </Row>
    </Container>
  );
};

export default Home;
