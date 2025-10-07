import React from "react";
import LoginForm from "../organisms/LoginForm";

const LoginPage = () => {
  const handleSubmit = async (formData) => {
    // Simular llamada API
    console.log("Login data:", formData);

    // Aquí harías tu fetch/axios real:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // });

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Login exitoso!");
        resolve();
      }, 2000);
    });
  };

  const handleForgotPassword = () => {
    console.log("Recuperar contraseña");
    // Navegar a página de recuperación
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <LoginForm
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    </div>
  );
};

export default LoginPage;
