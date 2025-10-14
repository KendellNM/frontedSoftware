import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import empresaService from "../../services/empresaService";
import FormField from "../molecules/FormField";
import useToast from "../../hooks/useToast";

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
  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => empresaService.create(payload),
    onSuccess: async () => {
      if (values?.ruc) {
        try {
          await empresaService.selectByRuc(values.ruc);
        } catch (e) {
          // Ignorar error de selección para no bloquear la navegación
        }
      }
      toast.success("Empresa registrada y seleccionada correctamente");
      navigate("/home");
    },
    onError: (e) => {
      toast.error(e?.message || "No se pudo registrar la empresa");
    }
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
    <main className="px-4 py-8">
      <section className="max-w-3xl mx-auto">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path fillRule="evenodd" d="M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75v10.5A2.25 2.25 0 0117.25 19.5H6.75A2.25 2.25 0 014.5 17.25V6.75zm3 2.25a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9zm0 3a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9zm0 3a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Registrar empresa</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/60 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Volver
          </button>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6 shadow-sm space-y-4">
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
              className="inline-flex items-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-60"
            >
              {isLoading ? "Procesando..." : "Elegir empresa"}
            </button>
            <button
              type="button"
              onClick={() => setValues(initialValues)}
              className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/60 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Limpiar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
