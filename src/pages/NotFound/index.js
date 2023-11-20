import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>404</h1>
          <h4>Oops! Page not found.</h4>
          <Button
            as={Link}
            to="/"
            variant="primary"
          >
            Go to Homepage
          </Button>
        </Col>
      </Row>
    </Container>
  );
};