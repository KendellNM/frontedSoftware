import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="px-4 py-8">
      <section className="max-w-3xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
          <div className="p-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 7.22a.75.75 0 10-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 10-1.06 1.06l2.25 2.25c.3.3.79.3 1.09 0l5.22-5.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Bienvenido</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Has iniciado sesión correctamente.</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-400 transition">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Estado</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Activo</p>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-400 transition">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Último acceso</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ahora mismo</p>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-400 transition">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Soporte</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">contacto@empresa.com</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Empresas</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/elegir-empresa"
                  className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-400 transition block"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Elegir empresa</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Accede al menú de empresas</p>
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Prácticas</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/practicas"
                  className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-400 transition block"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Ver prácticas</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Listado de prácticas</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
