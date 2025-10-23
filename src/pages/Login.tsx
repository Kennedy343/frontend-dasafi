import React, { useState } from "react";

const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.5 32.9 29.2 36 24 36
         c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7
         C33.9 6.3 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20
         c10 0 19-7.3 19-20 0-1.2-.1-2.3-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 16.5 18.9 14 24 14
         c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.9 6.3 29.2 4 24 4
         16 4 9.1 8.6 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.1-5
         c-2 1.5-4.7 2.4-7.2 2.4-5.1 0-9.4-3.4-10.9-8.1l-6.5 5
         C8.3 38.8 15.6 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3
         c-1 3.2-3.6 5.8-6.8 6.9l6.1 5C38.1 37.8
         41 31.6 41 24c0-1.2-.1-2.3-.4-3.5z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.365 1.43c.08 1.018-.36 2.017-1.01 2.747-.66.739-1.74 1.31-2.81 1.23-.1-1.01.36-2.03 1.02-2.77.66-.74 1.84-1.26 2.8-1.21zM20.16 17.08c-.39.89-.86 1.71-1.41 2.45-.74 1.01-1.68 2.28-2.92 2.3-1.22.03-1.6-.75-3.02-.75-1.42 0-1.83.72-3.05.78-1.28.06-2.26-1.1-3-2.1-1.64-2.24-2.9-6.33-1.22-9.1.84-1.36 2.36-2.23 4.01-2.26 1.26-.02 2.45.86 3.02.86.57 0 2.07-1.06 3.49-.9.59.02 2.25.24 3.31 1.83-.09.06-1.98 1.16-1.96 3.45.02 2.76 2.4 3.69 2.45 3.7z" />
  </svg>
);

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Contenedor con borde azul centrado */}
      <div className="w-full max-w-5xl border-2 border-blue-400 rounded-lg flex items-center justify-center p-6">
        {/* Tarjeta del formulario */}
        <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
            Inicio de sesión
          </h1>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-1">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su correo"
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium block mb-1"
              >
                Contraseña:
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  required
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-sm transition"
            >
              Iniciar sesión
            </button>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">O continua con:</span>
              <span className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm hover:shadow"
              >
                <GoogleIcon />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm hover:shadow"
              >
                <AppleIcon />
              </button>
            </div>

            <p className="text-sm text-gray-700">
              ¿No tienes cuenta?{" "}
              <a
                href="#"
                className="text-indigo-600 font-medium hover:underline"
              >
                Regístrate aquí
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
