// src/components/Fakultas/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateFakultas() {
  // Inisialisasi state untuk menyimpan nama fakultas
  const [namaKontak, setNamaKontak] = useState("");
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaFakultas kosong, set pesan error
    if (namaKontak.trim() === "") {
      setError("Nama Kontak is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    try {
      // Melakukan HTTP POST request untuk menyimpan data fakultas
      const response = await axios.post(
        "https://latihan-uts-pw2.vercel.app/api/api/kontak/store", // Endpoint API yang dituju
        {
          nama: namaKontak, // Data yang dikirim berupa objek JSON dengan properti 'nama'
        }
      );

      //Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika fakultas berhasil dibuat
        setSuccess("Kontak created successfully!");
        setNamaKontak(""); // Kosongkan input form setelah sukses submit
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create fakultas");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating Kontak");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Kontak</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Form untuk mengisi nama fakultas*/}
      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit*/}
        <div className="mb-3">
          <label className="form-label">Nama Kontak</label>
          {/* Input untuk nama fakultas dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="namaKontak"
            value={namaKontak} // Nilai input disimpan di state namaFakultas
            onChange={(e) => setNamaKontak(e.target.value)} // Update state saat input berubah
            placeholder="Enter Kontak Name" // Placeholder teks untuk input
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
