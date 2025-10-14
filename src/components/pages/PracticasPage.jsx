import React from "react";
import useTableData from "../../hooks/useTabla";
import practicasService from "../../services/practicasService";
import PracticasList from "../organisms/PracticasList";

export default function PracticasPage() {
  const { data, isLoading, isError, error } = useTableData("practicas", practicasService, { limit: 20 });
  const filtered = (data || []).filter((p) => Array.isArray(p.empresas) && p.empresas.length > 0);

  return (
    <main className="px-4 py-8">
      <section className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Prácticas</h1>
        </div>

        {isLoading && <div className="py-10 text-center text-gray-500">Cargando...</div>}
        {isError && <div className="py-6 text-center text-red-600">{error?.message || "Error al cargar las prácticas"}</div>}
        {!isLoading && !isError && <PracticasList practicas={filtered} />}
      </section>
    </main>
  );
}
