import React, { useMemo, useState } from "react";
import useTableData from "../../hooks/useTabla";
import practicasService from "../../services/practicasService";
import { useMutation } from "@tanstack/react-query";

export default function ValidarEmpresasPage() {
  const { data, isLoading, isError, error, refetch } = useTableData(
    "practicas-por-validar",
    practicasService,
    { estado: "PORVALIDAR", limit: 50 }
  );

  const [busqueda, setBusqueda] = useState("");
  const [detallesOpen, setDetallesOpen] = useState(false);
  const [seleccion, setSeleccion] = useState(null); // { empresa, practica }
  const [validadas, setValidadas] = useState(() => new Set());

  const filas = useMemo(() => {
    const arr = Array.isArray(data) ? data : [];
    // Aplana: una fila por empresa asociada a la práctica
    return arr.flatMap((p) =>
      (Array.isArray(p.empresas) ? p.empresas : []).map((e) => ({
        key: `${p.idPracticas}-${e.idEmpresa}`,
        empresa: e,
        practica: p,
        tutor: Array.isArray(p.tutores) && p.tutores.length > 0 ? (p.tutores[0]?.nombre || p.tutores[0]?.codigo || "asignado") : "sin asignar",
      }))
    );
  }, [data]);

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return filas;
    return filas.filter(({ empresa, practica }) => {
      const campos = [
        empresa?.nombre,
        empresa?.ruc,
        empresa?.representante,
        practica?.idPracticas,
        practica?.codigoEstudiante,
      ];
      return campos.some((v) => (v ?? "").toString().toLowerCase().includes(q));
    });
  }, [busqueda, filas]);

  const validarMutation = useMutation({
    mutationFn: ({ idPracticas, estado }) => practicasService.actualizarEstado(idPracticas, estado),
    onSuccess: () => {
      refetch();
    }
  });

  const validarEmpresa = (row) => {
    const { key, practica } = row;
    // Optimista
    setValidadas((prev) => new Set(prev).add(key));
    validarMutation.mutate(
      { idPracticas: practica?.idPracticas, estado: "ACTIVO" },
      {
        onError: () => {
          // Rollback
          setValidadas((prev) => {
            const copy = new Set(prev);
            copy.delete(key);
            return copy;
          });
        }
      }
    );
  };

  const abrirDetalles = (row) => {
    setSeleccion(row);
    setDetallesOpen(true);
  };

  const cerrarDetalles = () => {
    setDetallesOpen(false);
    setSeleccion(null);
  };

  return (
    <main className="px-4 py-8">
      <section className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Validación de Empresas (Coordinador)</h1>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por empresa, RUC, representante, PPP o código estudiante"
            className="w-full md:w-96 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
          />
        </div>

        {isLoading && <div className="py-10 text-center text-gray-500">Cargando...</div>}
        {isError && <div className="py-6 text-center text-red-600">{error?.message || "Error al cargar"}</div>}

        {!isLoading && !isError && (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">RUC</th>
                  <th className="px-4 py-3 font-medium">Representante</th>
                  <th className="px-4 py-3 font-medium">Tutor</th>
                  <th className="px-4 py-3 font-medium">PPP</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                      No hay empresas para mostrar.
                    </td>
                  </tr>
                )}
                {filtradas.map((row) => {
                  const { key, empresa, practica, tutor } = row;
                  const estadoBadge = validadas.has(key) ? "validado" : empresa?.estado || practica?.estado;
                  return (
                    <tr key={key} className="border-t border-gray-100 hover:bg-gray-50/60">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{empresa?.nombre}</div>
                        <div className="text-xs text-gray-500">{empresa?.email}</div>
                      </td>
                      <td className="px-4 py-3">{empresa?.ruc}</td>
                      <td className="px-4 py-3">{empresa?.representante || "-"}</td>
                      <td className="px-4 py-3">{tutor}</td>
                      <td className="px-4 py-3">{`PPP-${practica?.idPracticas}`}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full border bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
                          {estadoBadge}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => abrirDetalles(row)}
                            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            title="Ver detalles"
                          >
                            <EyeIcon className="h-4 w-4" />
                            Ver
                          </button>
                          <button
                            onClick={() => validarEmpresa(row)}
                            disabled={validadas.has(key) || validarMutation.isPending}
                            className="inline-flex items-center gap-1 rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                            title="Validar empresa"
                          >
                            <CardIcon className="h-4 w-4" />
                            {validadas.has(key) ? "Validado" : (validarMutation.isPending ? "Validando..." : "Validar")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {detallesOpen && seleccion && (
          <Modal onClose={cerrarDetalles} title="Detalles de la empresa">
            <div className="space-y-2 text-sm text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Info label="Empresa" value={seleccion.empresa?.nombre} />
                <Info label="RUC" value={seleccion.empresa?.ruc} />
                <Info label="Representante" value={seleccion.empresa?.representante} />
                <Info label="Correo" value={seleccion.empresa?.email} />
                <Info label="PPP" value={`PPP-${seleccion.practica?.idPracticas}`} />
                <Info label="Estudiante" value={`${seleccion.practica?.codigoEstudiante || "-"}`} />
                <Info label="Estado práctica" value={seleccion.practica?.estado} />
                <Info label="Tutor" value={Array.isArray(seleccion.practica?.tutores) && seleccion.practica.tutores.length > 0 ? (seleccion.practica.tutores[0]?.nombre || seleccion.practica.tutores[0]?.codigo || "asignado") : "sin asignar"} />
              </div>
            </div>
          </Modal>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value || "-"}</div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="rounded-md p-1 text-gray-500 hover:bg-gray-100">
            <span className="sr-only">Cerrar</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M10 8.586 4.293 2.879A1 1 0 1 0 2.88 4.293L8.586 10l-5.707 5.707a1 1 0 1 0 1.414 1.414L10 11.414l5.707 5.707a1 1 0 0 0 1.414-1.414L11.414 10l5.707-5.707A1 1 0 1 0 15.707 2.88L10 8.586Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CardIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 13h6M7 17h10" />
    </svg>
  );
}
