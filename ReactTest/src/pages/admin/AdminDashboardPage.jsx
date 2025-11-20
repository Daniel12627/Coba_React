// src/pages/admin/AdminDashboardPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AdminDashboardPage = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    setServices(JSON.parse(localStorage.getItem("services")) || []);
    setBookings(JSON.parse(localStorage.getItem("bookings")) || []);
    setStylists(JSON.parse(localStorage.getItem("stylists")) || []);
  }, []);

  return (
    <Container>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row className="g-3">
        <Col md={4}>
          <Card className="p-3">
            <h5>Layanan</h5>
            <div className="display-6">{services.length}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Pesanan</h5>
            <div className="display-6">{bookings.length}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Stylists</h5>
            <div className="display-6">{stylists.length}</div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;
