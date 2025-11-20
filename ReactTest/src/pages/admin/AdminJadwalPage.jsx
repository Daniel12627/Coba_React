// src/pages/admin/AdminJadwalPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "sonner";

const AdminJadwalPage = () => {
  const [stylists, setStylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState({ id: "", name: "", expertise: "", schedule: "" });

  useEffect(() => {
    setStylists(JSON.parse(localStorage.getItem("stylists")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("stylists", JSON.stringify(stylists));
  }, [stylists]);

  const openCreate = () => { setEdit(false); setCurrent({ id: "", name: "", expertise: "", schedule: "" }); setShowModal(true); };
  const openEdit = (s) => { setEdit(true); setCurrent(s); setShowModal(true); };

  const save = () => {
    if (!current.name) return toast.error("Nama stylist kosong");
    if (edit) setStylists(prev => prev.map(x => x.id === current.id ? current : x));
    else setStylists(prev => [...prev, { ...current, id: Date.now().toString() }]);
    toast.success(edit ? "Stylist diperbarui" : "Stylist ditambahkan");
    setShowModal(false);
  };

  const remove = (id) => {
    if (!confirm("Hapus stylist?")) return;
    const updated = stylists.filter(s => s.id !== id);
    setStylists(updated);
    toast.success("Stylist dihapus");
  };

  return (
    <Container>
      <h1 className="mb-3">Kelola Stylists</h1>
      <Button onClick={openCreate} className="mb-3">Tambah Stylist</Button>

      <Table striped bordered hover>
        <thead><tr><th>No</th><th>Nama</th><th>Keahlian</th><th>Jadwal</th><th>Aksi</th></tr></thead>
        <tbody>
          {stylists.map((s, idx) => (
            <tr key={s.id}><td>{idx+1}</td><td>{s.name}</td><td>{s.expertise}</td><td>{s.schedule}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => openEdit(s)} className="me-2">Edit</Button>
                <Button variant="danger" size="sm" onClick={() => remove(s.id)}>Hapus</Button>
              </td>
            </tr>
          ))}
          {stylists.length === 0 && <tr><td colSpan="5" className="text-center">Belum ada stylist</td></tr>}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>{edit ? "Edit Stylist" : "Tambah Stylist"}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control value={current.name} onChange={(e) => setCurrent({...current, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keahlian</Form.Label>
              <Form.Control value={current.expertise} onChange={(e) => setCurrent({...current, expertise: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jadwal (teks)</Form.Label>
              <Form.Control value={current.schedule} onChange={(e) => setCurrent({...current, schedule: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button onClick={save}>{edit ? "Simpan" : "Tambah"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminJadwalPage;
