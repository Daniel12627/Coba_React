// src/pages/pelanggan/LayananPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const defaultServices = [
  { id: "s1", name: "Haircut (Potong Rambut)", duration: 45, price: 75000, description: "Potong rambut sesuai model." },
  { id: "s2", name: "Hair Coloring", duration: 120, price: 250000, description: "Warna rambut profesional." },
  { id: "s3", name: "Manicure", duration: 60, price: 90000, description: "Perawatan kuku & cat." },
];

const LayananPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("services"));
    if (s && s.length) setServices(s);
    else {
      localStorage.setItem("services", JSON.stringify(defaultServices));
      setServices(defaultServices);
    }
  }, []);

  return (
    <Container className="mt-3">
      <h1 className="mb-4">Daftar Layanan</h1>
      <Row>
        {services.map((svc) => (
          <Col md={4} key={svc.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{svc.name}</Card.Title>
                <Card.Text>{svc.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small text-muted">Durasi: {svc.duration} menit</div>
                    <div className="fw-bold">Rp {svc.price.toLocaleString("id-ID")}</div>
                  </div>
                  <Button onClick={() => navigate("/booking", { state: { serviceId: svc.id } })}>Booking</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LayananPage;
