import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../organisms/LoginForm";
import AuthService from "../../services/authService";
import { useToast } from "../../hooks/useToast";

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async ({ username, password }) => {
    await AuthService.login({ username, password });
    toast.success("Inicio de sesión exitoso");
    navigate("/home", { replace: true });
    setTimeout(() => {
      if (window.location.pathname !== "/home") {
        window.location.assign("/home");
      }
    }, 50);
  };

  const handleForgotPassword = () => {
    console.log("Recuperar contraseña");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <section className="w-full max-w-md">
        <div className="rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white/90 dark:bg-gray-900/70 backdrop-blur-sm shadow-sm">
          <div className="p-6 sm:p-8">
            <LoginForm onSubmit={handleSubmit} onForgotPassword={handleForgotPassword} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
