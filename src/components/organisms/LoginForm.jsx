import React, { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

const LoginForm = ({ onSubmit, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({
        submit: error.message || "Error al iniciar sesión",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
        <p className="text-gray-600 mt-1">Ingresa tus credenciales</p>
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="tu@email.com"
        error={errors.email}
        required
        autoComplete="email"
      />

      <FormField
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.password}
        required
        autoComplete="current-password"
      />

      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <Button type="submit" fullWidth loading={loading} size="lg">
        Ingresar
      </Button>

      {onForgotPassword && (
        <button
          type="button"
          onClick={onForgotPassword}
          className="w-full text-sm text-blue-600 hover:text-blue-700 underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
      )}
    </form>
  );
};

LoginForm.displayName = "LoginForm";

export default LoginForm;
