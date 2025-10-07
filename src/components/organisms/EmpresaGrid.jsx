import React, { useMemo, useState, useEffect } from "react";
import SearchBar from "../molecules/Search";
import useTableData from "../../hooks/useTabla";
import empresaService from "../../services/empresaService";
import EmpresaCard from "../molecules/EmpresaCard";

const EmpresaGrid = () => {
  const {
    data: empresas,
    isLoading,
    isError,
    error,
    handleSearch,
    pagination,
  } = useTableData("empresas", empresaService, { limit: 20 });

  const [selectedId, setSelectedId] = useState(null);
  const selectedEmpresa = useMemo(
    () => empresas?.find((e) => e.idEmpresa === selectedId) || null,
    [empresas, selectedId]
  );

  useEffect(() => {
    if (!selectedId && empresas && empresas.length > 0) {
      setSelectedId(empresas[0].idEmpresa);
    }
  }, [empresas, selectedId]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Empresas</h2>
        <SearchBar onSearch={handleSearch} placeholder="Buscar empresas..." />
      </div>

      {isLoading && (
        <div className="py-10 text-center text-gray-500">Cargando empresas...</div>
      )}

      {isError && (
        <div className="py-6 text-center text-red-600">{error?.message || "Error al cargar las empresas"}</div>
      )}

      {!isLoading && !isError && (
        <>
          {(!empresas || empresas.length === 0) ? (
            <div className="py-10 text-center text-gray-500">No se encontraron empresas.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left: vertical list */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="rounded-xl border border-gray-200 bg-white">
                  <ul className="divide-y divide-gray-100 max-h-[70vh] overflow-auto">
                    {empresas.map((e) => {
                      const active = e.idEmpresa === selectedId;
                      return (
                        <li
                          key={e.idEmpresa}
                          className={`p-3 sm:p-4 cursor-pointer transition-colors ${active ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                          onClick={() => setSelectedId(e.idEmpresa)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-9 w-9 flex items-center justify-center rounded-full font-semibold ${active ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"}`}>
                              {(e.razonSocial?.[0] || "?").toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-medium text-gray-900 truncate">{e.razonSocial || "Sin razón social"}</p>
                                <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full border ${e.estado === "ACTIVO" || e.estado === "activo" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}>
                                  {e.estado || "-"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 truncate">RUC: {e.ruc || "-"} · Año: {e.anio || "-"}</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Right: detail panel */}
              <div className="lg:col-span-7 xl:col-span-8">
                {selectedEmpresa ? (
                  <EmpresaCard empresa={selectedEmpresa} />
                ) : (
                  <div className="h-full min-h-[16rem] rounded-xl border border-dashed border-gray-300 p-6 flex items-center justify-center text-gray-500">
                    Selecciona una empresa de la lista para ver el detalle
                  </div>
                )}
              </div>
            </div>
          )}

          {pagination?.totalPages > 1 && (
            <div className="mt-6 text-sm text-gray-500 text-center">
              Página {pagination.currentPage} de {pagination.totalPages}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmpresaGrid;
