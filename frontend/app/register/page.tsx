// @ts-nocheck
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", form);
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: "Silahkan login dengan akun barumu.",
        confirmButtonColor: "#3b82f6",
      }).then(() => {
        router.push("/");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Email mungkin sudah terdaftar atau server error.",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg-apotikita.png')`,
      }}
    >
      {/* EFEK GLASSMORPHISM: bg-white/30 + backdrop-blur-md */}
      <div className="bg-white/30 backdrop-blur-md w-full max-w-md rounded-3xl shadow-2xl p-10 border border-white/20">
        <h1 className="text-4xl font-black text-center mb-2 tracking-tighter italic text-white drop-shadow-md">
          Apoti<span className="text-blue-200">kita</span>
        </h1>
        <p className="text-center text-white/90 font-bold mb-8 uppercase text-xs tracking-widest drop-shadow-sm">
          Daftar Akun Baru
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="text-black w-full p-4 rounded-2xl border border-white/40 bg-white/70 focus:bg-white outline-none transition font-semibold placeholder:text-gray-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="text-black w-full p-4 rounded-2xl border border-white/40 bg-white/70 focus:bg-white outline-none transition font-semibold placeholder:text-gray-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="text-black w-full p-4 rounded-2xl border border-white/40 bg-white/70 focus:bg-white outline-none transition font-semibold placeholder:text-gray-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition transform hover:-translate-y-1">
            DAFTAR SEKARANG
          </button>
        </form>

        <div className="mt-8 text-center text-white font-semibold text-sm drop-shadow-md">
          Sudah punya akun?{" "}
          <Link
            href="/"
            className="text-blue-200 hover:text-white hover:underline transition font-bold"
          >
            Login di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
