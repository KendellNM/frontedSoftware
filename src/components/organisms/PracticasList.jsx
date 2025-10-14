import React from "react";

export default function PracticasList({ practicas = [] }) {
  if (!practicas || practicas.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">No hay prácticas para mostrar.</div>
    );
  }

  return (
    <div className="space-y-4">
      {practicas.map((p) => (
        <div key={p.idPracticas} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="font-medium text-gray-900">{p.codigoEstudiante} · {p.nombreEstudiante || "(sin nombre)"}</div>
            <span className="text-xs px-2 py-1 rounded-full border bg-gray-50 text-gray-700">{p.estado}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">Fecha solicitud: {p.fechaSolicitud || "-"}</div>
          {p.empresas && p.empresas.length > 0 && (
            <div className="mt-3 text-sm text-gray-700">
              <div className="font-medium">Empresas asociadas ({p.empresas.length}):</div>
              <ul className="list-disc list-inside">
                {p.empresas.map((e) => (
                  <li key={`${p.idPracticas}-${e.idEmpresa}`}>{e.nombre} · RUC: {e.ruc} · Estado: {e.estado}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
