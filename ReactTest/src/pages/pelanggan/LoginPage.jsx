// src/pages/pelanggan/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "pelanggan") navigate("/layanan");
  }, [navigate]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.username || !user.password) return toast.error("Isi username & password");
    // For demo: accept any username/password
    localStorage.setItem("user", JSON.stringify({ username: user.username, loginAt: new Date() }));
    localStorage.setItem("role", "pelanggan");
    toast.success("Login pelanggan berhasil!");
    navigate("/layanan");
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center display-6">Login Pelanggan</h1>
      <p className="text-center text-muted">Masuk untuk membuat booking</p>
      <Alert variant="info">Bebas menggunakan username apa saja (demo). Jika mau akses admin, gunakan halaman /admin/login</Alert>

      <Form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "auto" }}>
        <FloatingLabel label="Username" className="mb-3">
          <Form.Control type="text" name="username" placeholder="username" onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control type="password" name="password" placeholder="password" onChange={handleChange} />
        </FloatingLabel>
        <Button type="submit" className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
