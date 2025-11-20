// src/pages/pelanggan/RegisterPage.jsx
import React, { useState } from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return toast.error("Semua field harus diisi");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ id: Date.now().toString(), username: form.username, password: form.password });
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Registrasi berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <h1 className="display-6">Daftar Pelanggan</h1>
      <Form onSubmit={handleRegister} style={{ maxWidth: 600 }}>
        <FloatingLabel label="Username" className="mb-3">
          <Form.Control name="username" placeholder="username" onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control type="password" name="password" placeholder="password" onChange={handleChange} />
        </FloatingLabel>
        <Button type="submit">Daftar</Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
