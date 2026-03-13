// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function EditMedicinePage() {
  const [form, setForm] = useState({ name: "", category: "", price: "" });
  const router = useRouter();
  const { id } = useParams(); // Mengambil ID dari URL

  // 1. Ambil data obat yang mau diedit berdasarkan ID
  const fetchDetail = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/medicines/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        name: res.data.name,
        category: res.data.category,
        price: res.data.price,
      });
    } catch (err) {
      Swal.fire("Gagal", "Data tidak ditemukan", "error");
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  // 2. Fungsi Update Data
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(form.price) < 0) {
      Swal.fire({
        icon: "error",
        title: "Waduh...",
        text: "Harga tidak boleh negatif!",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/medicines/${id}`,
        { ...form, price: Number(form.price) },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      Swal.fire({
        icon: "success",
        title: "Terupdate!",
        text: "Data obat berhasil diubah.",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/dashboard");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Gagal", text: "Gagal update data." });
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-fixed bg-center font-sans"
      style={{ backgroundImage: `url('/bg-apotikita.png')` }}
    >
      {/* SIDEBAR (Sama dengan Dashboard) */}
      <div className="w-72 bg-gradient-to-b from-blue-700 to-purple-900 text-white flex flex-col shadow-2xl">
        <div className="p-8 text-3xl font-black border-b border-white/10 tracking-tighter italic">
          Apoti<span className="text-purple-300">kita</span>
        </div>
        <nav className="flex-1 p-6 space-y-4 mt-4 text-sm font-bold">
          <div
            onClick={() => router.push("/dashboard")}
            className="p-4 hover:bg-white/5 rounded-2xl cursor-pointer transition flex items-center gap-3"
          >
            Dashboard
          </div>
        </nav>
      </div>

      {/* MAIN CONTENT EDIT */}
      <div className="flex-1 p-10 overflow-y-auto bg-white/30 backdrop-blur-[2px] flex items-center justify-center">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-2xl border border-gray-50">
          <h2 className="text-3xl font-black mb-8 text-blue-900 italic text-center">
            Edit Informasi <span className="text-blue-600">Obat</span>
          </h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 ml-2 uppercase">
                Nama Obat
              </label>
              <input
                className="text-black font-semibold border-2 border-gray-100 p-4 rounded-2xl w-full focus:border-blue-500 outline-none transition bg-gray-50"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 ml-2 uppercase">
                Kategori
              </label>
              <input
                className="text-black font-semibold border-2 border-gray-100 p-4 rounded-2xl w-full focus:border-blue-500 outline-none transition bg-gray-50"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 ml-2 uppercase">
                Harga Obat
              </label>
              <input
                className="text-black font-semibold border-2 border-gray-100 p-4 rounded-2xl w-full focus:border-blue-500 outline-none transition bg-gray-50"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl font-black shadow-lg shadow-blue-200 transition active:scale-95">
                SIMPAN PERUBAHAN
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="bg-gray-100 text-gray-500 px-8 rounded-2xl font-bold hover:bg-gray-200 transition"
              >
                BATAL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
