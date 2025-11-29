// src/pages/pelanggan/HomePage.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ImageCarousel from "../../components/ImageCarousel";

const images = [
  { img: "src/assets/images/HairStyling.jpeg", title: "Hair Styling", description: "Tampil beda dengan potongan profesional" },
  { img: "src/assets/images/Hair Coloring.jpeg", title: "Coloring", description: "Warna rambut yang on-trend" },
  { img: "src/assets/images/Nail & Spa.jpeg", title: "Nail & Spa", description: "Perawatan tangan & kaki" },
];

const HomePage = () => {
  return (
    <>
      <ImageCarousel images={images} />
      <Container className="mt-5">
        <Row>
          <Col md={7}>
            <h2 className="fw-normal">Aurora Salon — Keindahan yang kamu percayakan</h2>
            <p className="lead">Layanan profesional: haircut, coloring, styling, manicure, pedicure, dan perawatan wajah.</p>
            <p>Login untuk memesan layanan atau lihat daftar layanan terlebih dahulu.</p>
          </Col>
          <Col md={5}>
            <Card className="p-3 shadow">
              <h5>Jam Operasional</h5>
              <p className="mb-0">Senin - Sabtu: 09:00 - 19:00</p>
              <p>Telepon: 0812-XXX-XXXX</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
