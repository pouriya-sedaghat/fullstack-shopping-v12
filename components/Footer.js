import { Container, Row, Col } from "reactstrap";

function Footer() {
  return (
    <Container fluid className="bg-dark text-light">
      <Row>
        <Col xs={12} className="text-center py-2">
          Footer
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
