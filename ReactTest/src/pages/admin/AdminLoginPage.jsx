// src/pages/admin/AdminLoginPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin/dashboard");
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    // demo admin credentials
    if (form.username === "admin" && form.password === "admin123") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify({ username: "Admin", loginAt: new Date() }));
      toast.success("Login admin berhasil");
      navigate("/admin/dashboard");
    } else {
      toast.error("Credensial admin salah (username: admin / password: admin123)");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Admin Login</h1>
      <Alert variant="warning">Akun demo: username <strong>admin</strong>, password <strong>admin123</strong></Alert>
      <Form onSubmit={handleLogin} style={{ maxWidth: 600 }}>
        <FloatingLabel label="Username" className="mb-3">
          <Form.Control name="username" onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control type="password" name="password" onChange={handleChange} />
        </FloatingLabel>
        <Button type="submit">Login Admin</Button>
      </Form>
    </Container>
  );
};

export default AdminLoginPage;
