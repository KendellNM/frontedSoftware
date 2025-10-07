import React, { useState } from "react";
import "./App.css";
import AppRoutes from "./routes.jsx";
import Header from "./components/organisms/Header.jsx";
import Sidebar from "./components/organisms/Sidebar.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      <div className="flex-1 flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 px-2 sm:px-3 lg:px-4 py-3">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
