import React from "react";
import "./ProfilePage.css";


const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return (
            <div className="container mt-5">
            <h3 className="text-center">Anda belum login.</h3>
            </div>
        );
    }
    return (
        <div className="profile-container container mt-5 col-md-6">
        <h2 className="profile-title mb-4 text-center">Profil Pengguna</h2>

        <div className="profile-card card p-4 shadow">
        <p><strong>Nama : </strong>{user.username}</p>
        <p><strong>Email : </strong>{user.email}</p>
        <p><strong>Nomor HP : </strong>{user.nomor}</p>
        <p><strong>ID Pengguna : </strong>{user.id}</p>
    </div>
</div>
    );
};

export default ProfilePage;