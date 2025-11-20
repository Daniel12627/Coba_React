// src/pages/pelanggan/PesananPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { toast } from "sonner";

const PesananPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(b);
  }, []);

  const cancel = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: "Dibatalkan" } : b);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    toast.success("Booking dibatalkan");
  };

  const findService = (id) => (JSON.parse(localStorage.getItem("services")) || []).find(s => s.id === id)?.name || "Layanan";
  const findStylist = (id) => (JSON.parse(localStorage.getItem("stylists")) || []).find(s => s.id === id)?.name || "Stylist";

  return (
    <Container className="mt-3">
      <h1>Daftar Pesanan</h1>
      <Table striped bordered hover>
        <thead>
          <tr><th>No</th><th>Pelayanan</th><th>Stylist</th><th>Tanggal</th><th>Waktu</th><th>Status</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {bookings.map((b, idx) => (
            <tr key={b.id}>
              <td>{idx + 1}</td>
              <td>{findService(b.serviceId)}</td>
              <td>{findStylist(b.stylistId)}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.status}</td>
              <td>
                {b.status !== "Dibatalkan" && b.status !== "Selesai" ? (
                  <Button variant="danger" size="sm" onClick={() => cancel(b.id)}>Batalkan</Button>
                ) : null}
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr><td colSpan="7" className="text-center">Belum ada pesanan.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PesananPage;
