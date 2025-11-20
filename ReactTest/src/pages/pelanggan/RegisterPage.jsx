import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            toast.error("Semua field harus diisi!");
            return;
        }

        // Ambil semua user dari localStorage
        const customers = JSON.parse(localStorage.getItem("customers")) || [];

        // Cek apakah email sudah dipakai
        const isExist = customers.some((c) => c.email === form.email);

        if (isExist) {
            toast.error("Email sudah terdaftar!");
            return;
        }

        const newCustomer = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            password: form.password,
        };

        // Simpan ke localStorage
        customers.push(newCustomer);
        localStorage.setItem("customers", JSON.stringify(customers));

        toast.success("Registrasi berhasil!");

        setTimeout(() => navigate("/pelanggan/login"), 800);
    };

    return (
        <Container className="mt-5 col-md-6">
            <h2 className="text-center mb-4">Daftar Akun Pelanggan</h2>

            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan nama"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Masukkan email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Masukkan password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    className="w-100"
                    type="submit"
                >
                    Daftar
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
