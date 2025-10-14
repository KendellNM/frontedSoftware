import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import empresaService from "../../services/empresaService";
import useToast from "../../hooks/useToast";
import { IconCalendar, IconMail, IconPhone, IconHome, IconUser } from "../atoms/Icons";

const EmpresaCard = ({ empresa }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate: seleccionar, isLoading } = useMutation({
    mutationFn: () => empresaService.selectByRuc(empresa?.ruc),
    onSuccess: () => {
      toast.success("Empresa seleccionada correctamente");
      navigate("/home");
    },
    onError: (e) => {
      toast.error(e?.message || "No se pudo seleccionar la empresa");
    }
  });
  const {
    razonSocial,
    ruc,
    correo,
    telefono,
    direccion,
    anio,
    estado,
    logoUrl,
    logo,
    imagen,
    representantes = [],
  } = empresa || {};

  const imageSrc = logoUrl || logo || imagen;

  const estadoColor = estado === "activo" || estado === "ACTIVO" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-semibold">
            {(razonSocial?.[0] || "?" ).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-gray-900 truncate">{razonSocial || "Sin razón social"}</h3>
            <div className="text-xs text-gray-500 truncate">RUC: {ruc || "-"}</div>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${estadoColor}`}>
          {estado || "-"}
        </span>
      </div>
      {imageSrc && (
        <div className="mt-3 rounded-lg ring-1 ring-gray-100 bg-white flex items-center justify-center p-2">
          <img
            src={imageSrc}
            alt={razonSocial || "Imagen"}
            className="max-h-40 sm:max-h-48 lg:max-h-56 w-auto object-contain"
            loading="lazy"
          />
        </div>
      )}

      <div className="my-4 h-px bg-gray-100" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <IconCalendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">Año:</span>
          <span className="text-gray-800">{anio || "-"}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconMail className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">Correo:</span>
          <span className="text-gray-800 truncate">{correo || "-"}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconPhone className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">Teléfono:</span>
          <span className="text-gray-800">{telefono || "-"}</span>
        </div>
        <div className="flex items-start gap-2 sm:col-span-2">
          <IconHome className="h-4 w-4 text-gray-400 mt-0.5" />
          <span className="text-gray-500">Dirección:</span>
          <span className="text-gray-800">{direccion || "-"}</span>
        </div>
      </div>

      {/* Representatives */}
      <div className="mt-4">
        <div className="text-sm font-medium text-gray-900">Representantes ({representantes?.length || 0})</div>
        {representantes && representantes.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {representantes.slice(0, 3).map((rep) => (
              <span
                key={rep.idRepresentante}
                className="inline-flex items-center gap-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200 px-2.5 py-1 text-xs"
                title={`${rep.nombre} · ${rep.cargo}`}
              >
                <IconUser className="h-3.5 w-3.5 text-gray-400" />
                <span className="truncate max-w-[10rem]">{rep.nombre}</span>
                <span className="text-gray-400">· {rep.cargo}</span>
              </span>
            ))}
            {representantes.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-1 text-xs">
                +{representantes.length - 3} más
              </span>
            )}
          </div>
        ) : (
          <div className="mt-1 text-sm text-gray-500">Sin representantes</div>
        )}
      </div>

      <div className="mt-6">
        <button
          type="button"
          disabled={!empresa?.ruc || isLoading}
          onClick={() => seleccionar()}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {isLoading ? "Seleccionando..." : "Seleccionar esta empresa"}
        </button>
      </div>
    </div>
  );
};

export default EmpresaCard;
