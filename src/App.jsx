import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes.jsx";
import Header from "./components/organisms/Header.jsx";
import Sidebar from "./components/organisms/Sidebar.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/formulario";

  return (
    <ToastProvider>
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAuthRoute && (
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
      )}

      <div className={`flex-1 flex w-full ${!isAuthRoute ? "mt-16" : ""}`}>
        {!isAuthRoute && (
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <main className="flex-1 w-full overflow-y-auto p-4">
          <AppRoutes />
        </main>
      </div>
    </div>
    </ToastProvider>
  );
}

export default App;
