import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logged = localStorage.getItem("loggedCustomer");
        if (logged) navigate("/pelanggan/home");
    }, [navigate]);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const { email, password } = form;

        if (!email || !password) {
            toast.error("Email dan password wajib diisi!");
            return;
        }

        // Ambil semua pelanggan
        const customers = JSON.parse(localStorage.getItem("customers")) || [];

        // Cek kecocokan akun
        const found = customers.find(
            (c) => c.email === email && c.password === password
        );

        if (!found) {
            toast.error("Akun tidak ditemukan! Silakan register terlebih dahulu.");
            return;
        }

        // Simpan status login
        localStorage.setItem("loggedCustomer", JSON.stringify(found));

        toast.success("Login berhasil!");

        setTimeout(() => navigate("/pelanggan/home"), 800);
    };

    return (
        <Container className="mt-5 col-md-6">
            <h2 className="text-center mb-4">Login Pelanggan</h2>

            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Masukkan email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Masukkan password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" className="w-100" type="submit">
                    Login
                </Button>

                <p className="text-center mt-3">
                    Belum punya akun?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/pelanggan/register")}
                    >
                        Daftar di sini
                    </span>
                </p>
            </Form>
        </Container>
    );
};

export default LoginPage;
