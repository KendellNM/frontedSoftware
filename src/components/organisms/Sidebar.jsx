import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open = false, onClose = () => {} }) => {
  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "text-indigo-700 bg-indigo-50" : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-72 bg-white border-r border-gray-200 transform transition-transform md:static md:inset-auto md:translate-x-0 md:z-0 md:w-64 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-hidden={!open}
      >
        <div className="h-14" />
        <div className="px-3 py-3">
          <nav className="flex flex-col gap-1">
            <NavLink to="/empresas" className={linkClass} onClick={onClose}>
              Empresas
            </NavLink>

            <NavLink to="/elegir-empresa/nueva" className={linkClass} onClick={onClose}>
              Nueva empresa
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
