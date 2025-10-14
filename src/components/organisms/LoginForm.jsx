import React, { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import { useToast } from "../../hooks/useToast";

const LoginForm = ({ onSubmit, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "El usuario es requerido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mostrar errores por toast
      const messages = Object.values(newErrors);
      messages.forEach((m) => toast.error(m));
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
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
        label="Usuario"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="tu_usuario"
        required
        autoComplete="username"
      />

      <FormField
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

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
