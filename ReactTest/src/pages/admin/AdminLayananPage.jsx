// src/pages/admin/AdminLayananPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "sonner";

const AdminLayananPage = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [current, setCurrent] = useState({ id: "", name: "", duration: 0, price: 0, description: "" });

  useEffect(() => {
    setServices(JSON.parse(localStorage.getItem("services")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  const openCreate = () => {
    setIsEdit(false);
    setCurrent({ id: "", name: "", duration: 0, price: 0, description: "" });
    setShowModal(true);
  };

  const openEdit = (svc) => {
    setIsEdit(true);
    setCurrent(svc);
    setShowModal(true);
  };

  const save = () => {
    if (!current.name) return toast.error("Nama layanan kosong");
    if (isEdit) {
      setServices((prev) => prev.map(s => s.id === current.id ? current : s));
      toast.success("Layanan diperbarui");
    } else {
      setServices((prev) => [...prev, { ...current, id: Date.now().toString() }]);
      toast.success("Layanan ditambahkan");
    }
    setShowModal(false);
  };

  const remove = (id) => {
    if (!confirm("Hapus layanan?")) return;
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    toast.success("Layanan dihapus");
  };

  return (
    <Container>
      <h1 className="mb-3">Kelola Layanan</h1>
      <Button onClick={openCreate} className="mb-3">Tambah Layanan</Button>
      <Table striped bordered hover>
        <thead><tr><th>No</th><th>Nama</th><th>Durasi</th><th>Harga</th><th>Aksi</th></tr></thead>
        <tbody>
          {services.map((s, idx) => (
            <tr key={s.id}>
              <td>{idx + 1}</td>
              <td>{s.name}</td>
              <td>{s.duration} menit</td>
              <td>Rp {s.price.toLocaleString("id-ID")}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => openEdit(s)} className="me-2">Edit</Button>
                <Button variant="danger" size="sm" onClick={() => remove(s.id)}>Hapus</Button>
              </td>
            </tr>
          ))}
          {services.length === 0 && <tr><td colSpan="5" className="text-center">Belum ada layanan</td></tr>}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>{isEdit ? "Edit Layanan" : "Tambah Layanan"}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control value={current.name} onChange={(e) => setCurrent({...current, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Durasi (menit)</Form.Label>
              <Form.Control type="number" value={current.duration} onChange={(e) => setCurrent({...current, duration: parseInt(e.target.value || 0)})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control type="number" value={current.price} onChange={(e) => setCurrent({...current, price: parseInt(e.target.value || 0)})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={3} value={current.description} onChange={(e) => setCurrent({...current, description: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button onClick={save}>{isEdit ? "Simpan" : "Tambah"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminLayananPage;
