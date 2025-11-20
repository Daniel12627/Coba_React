// src/pages/admin/AdminPesananPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { toast } from "sonner";

const AdminPesananPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem("bookings")) || []);
  }, []);

  const updateStatus = (id, status) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    toast.success("Status diperbarui");
  };

  const findService = (id) => (JSON.parse(localStorage.getItem("services")) || []).find(s => s.id === id)?.name || "Layanan";
  const findStylist = (id) => (JSON.parse(localStorage.getItem("stylists")) || []).find(s => s.id === id)?.name || "Stylist";

  return (
    <Container>
      <h1 className="mb-3">Kelola Pesanan</h1>
      <Table striped bordered hover>
        <thead><tr><th>No</th><th>Pelanggan</th><th>Layanan</th><th>Stylist</th><th>Tanggal</th><th>Waktu</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {bookings.map((b, idx) => (
            <tr key={b.id}>
              <td>{idx + 1}</td>
              <td>{b.customer}</td>
              <td>{findService(b.serviceId)}</td>
              <td>{findStylist(b.stylistId)}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.status}</td>
              <td>
                <Form.Select size="sm" value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)}>
                  <option>Menunggu</option>
                  <option>Sedang Dilayani</option>
                  <option>Selesai</option>
                  <option>Dibatalkan</option>
                </Form.Select>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && <tr><td colSpan="8" className="text-center">Belum ada pesanan</td></tr>}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPesananPage;
