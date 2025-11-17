"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("¡Error al obtener la cookie CSRF!", error);
      alert("Error de conexión con el servidor. Revisa la consola.");
      return;
    }

    const formData = {
      name,
      email,
      password,
      password_confirmation,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("¡Usuario registrado con éxito!", response);
      alert("¡Registro exitoso! Revisa tu base de datos.");
    } catch (error) {
      console.error("¡Error en el registro!", error);

      if (axios.isAxiosError(error) && error.response) {
        console.error("Datos del error:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-gray-800 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Crear Cuenta
        </h2>
        {/* Campo de Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        {/* Campo de Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        {/* Campo de Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        {/* Campo de Confirmación de Password */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="password_confirmation"
          >
            Confirmar Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        {/* Botón de Registro */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
