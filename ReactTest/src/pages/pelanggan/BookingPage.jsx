// src/pages/pelanggan/BookingPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preServiceId = location.state?.serviceId || null;

  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [form, setForm] = useState({ serviceId: preServiceId || "", stylistId: "", date: "", time: "" });

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("services")) || [];
    setServices(s);
    const st = JSON.parse(localStorage.getItem("stylists")) || [];
    setStylists(st);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.serviceId || !form.stylistId || !form.date || !form.time) return toast.error("Lengkapi semua field");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now().toString(),
      serviceId: form.serviceId,
      stylistId: form.stylistId,
      date: form.date,
      time: form.time,
      status: "Menunggu",
      customer: JSON.parse(localStorage.getItem("user"))?.username || "Tamu",
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    toast.success("Booking berhasil dibuat!");
    navigate("/pesanan");
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={8}>
          <h2>Form Booking</h2>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel label="Pilih Layanan" className="mb-3">
              <Form.Select name="serviceId" value={form.serviceId} onChange={handleChange}>
                <option value="">-- Pilih layanan --</option>
                {services.map((s) => <option key={s.id} value={s.id}>{s.name} — Rp {s.price.toLocaleString("id-ID")}</option>)}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="Pilih Stylist" className="mb-3">
              <Form.Select name="stylistId" value={form.stylistId} onChange={handleChange}>
                <option value="">-- Pilih stylist --</option>
                {stylists.map((st) => <option key={st.id} value={st.id}>{st.name} — {st.expertise}</option>)}
              </Form.Select>
            </FloatingLabel>

            <Row>
              <Col md={6}>
                <FloatingLabel label="Tanggal" className="mb-3">
                  <Form.Control type="date" name="date" value={form.date} onChange={handleChange} />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel label="Waktu" className="mb-3">
                  <Form.Control type="time" name="time" value={form.time} onChange={handleChange} />
                </FloatingLabel>
              </Col>
            </Row>

            <Button type="submit">Pesan Sekarang</Button>
          </Form>
        </Col>

        <Col md={4}>
          <Card className="p-3">
            <h5>Ringkasan</h5>
            <div className="small text-muted">Pastikan memilih tanggal dan waktu yang tersedia</div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
