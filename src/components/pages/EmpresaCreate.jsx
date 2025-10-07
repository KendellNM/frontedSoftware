import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import empresaService from "../../services/empresaService";
import FormField from "../molecules/FormField";

const initialValues = {
  razonSocial: "",
  ruc: "",
  correo: "",
  telefono: "",
  direccion: "",
  logoUrl: "",
};

export default function EmpresaCreate() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => empresaService.create(payload),
    onSuccess: () => {
      navigate("/empresas");
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Registrar empresa</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Volver
        </button>
      </div>

      <form onSubmit={onSubmit} className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Razón social"
            name="razonSocial"
            value={values.razonSocial}
            onChange={onChange}
            required
            placeholder="Ej. ACME S.A."
          />
          <FormField
            label="RUC"
            name="ruc"
            value={values.ruc}
            onChange={onChange}
            placeholder="Ej. 20123456789"
          />
          <FormField
            label="Correo"
            type="email"
            name="correo"
            value={values.correo}
            onChange={onChange}
            placeholder="empresa@correo.com"
          />
          <FormField
            label="Teléfono"
            name="telefono"
            value={values.telefono}
            onChange={onChange}
            placeholder="Ej. 999-999-999"
          />
          <FormField
            label="Dirección"
            name="direccion"
            value={values.direccion}
            onChange={onChange}
            placeholder="Calle 123, Ciudad"
            className="sm:col-span-2"
          />
          <FormField
            label="Logo URL (opcional)"
            name="logoUrl"
            value={values.logoUrl}
            onChange={onChange}
            placeholder="https://.../logo.png"
            className="sm:col-span-2"
          />
        </div>

        <div className="pt-2 flex items-center gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {isLoading ? "Guardando..." : "Registrar"}
          </button>
          <button
            type="button"
            onClick={() => setValues(initialValues)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
