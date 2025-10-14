import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import empresaService from "../../services/empresaService";

export default function ElegirEmpresa() {
  const navigate = useNavigate();
  const [ruc, setRuc] = useState("");

  const { mutate: selectEmpresa, isLoading } = useMutation({
    mutationFn: (rucValue) => empresaService.selectByRuc(rucValue),
    onSuccess: () => {
      navigate("/home");
    }
  });

  return (
    <main className="px-4 py-8">
      <section className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path fillRule="evenodd" d="M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75v10.5A2.25 2.25 0 0117.25 19.5H6.75A2.25 2.25 0 014.5 17.25V6.75zm3 2.25a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9zm0 3a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9zm0 3a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Elegir empresa</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => navigate("/elegir-empresa/empresas")}
            className="rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/80 dark:bg-gray-900/60 p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Ver empresas</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Lista y selecciona una empresa existente</div>
          </button>

          <Link
            to="/elegir-empresa/nueva"
            className="rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/80 dark:bg-gray-900/60 p-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Nueva empresa</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Registra una nueva empresa</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
