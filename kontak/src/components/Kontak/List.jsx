import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
export default function List() {
    const handleDelete = (id, nama) => {
        Swal.fire({
          title: "Are you sure?",
          text: `You won't be able to revert this! Prodi: ${nama}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",  
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            // Lakukan penghapusan jika dikonfirmasi
            axios
              .delete(`https://latihan-uts-pw2.vercel.app/api/api/kontak/${id}`)
              .then((response) => {
                // Hapus prodi dari state setelah sukses dihapus dari server
                setKontak(kontak.filter((f) => f.id !== id));
                // Tampilkan notifikasi sukses
                Swal.fire("Deleted!", "Your data has been deleted.", "success");
              })
              .catch((error) => {
                console.error("Error deleting data:", error); // Menangani error
                Swal.fire(
                  "Error",
                  "There was an issue deleting the data.",
                  "error"
                );
              });
          }
        });
      };
  const [kontak, setKontak] = useState([]);

  useEffect(() => {
    axios
      .get("https://latihan-uts-pw2.vercel.app/api/api/kontak")
      .then((response) => {
        console.log(response.data.result);
        setKontak(response.data.result);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);
  return (
    <>
      <h2>List Program Studi</h2>
      <NavLink to="/kontak/store" className="btn btn-primary mb-3">
        Create
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {kontak.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Action buttons"
                >
                  <NavLink
                    to={`/kontak/edit/${data.id}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(data.id, data.nama)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
