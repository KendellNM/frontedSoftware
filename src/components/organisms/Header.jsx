import React from "react";
import { Link } from "react-router-dom";
import { IconMenu, IconClose, IconChat, IconBell, IconTools } from "../atoms/Icons";

const Header = ({ sidebarOpen = false, onToggleSidebar = () => {} }) => {

  return (
    <header className="sticky top-0 z-30 w-full shadow-sm">
      <div className="w-full bg-white/80 dark:bg-[#0a1024]/90 text-gray-900 dark:text-white backdrop-blur">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-3 h-14 items-center">
            <div className="flex items-center gap-2 min-w-0">
              <Link to="/" className="flex items-center gap-2 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white dark:bg-white/15 dark:text-white flex items-center justify-center font-bold ring-1 ring-indigo-600/20 dark:ring-white/20">
                  P
                </div>
                <span className="hidden sm:block text-sm font-semibold truncate text-gray-900 dark:text-white">UPeU</span>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <h1 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase text-gray-900 dark:text-gray-100">Prácticas pre-profesionales</h1>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button className="hidden md:inline-flex p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10" aria-label="Chat"><IconChat className="h-5 w-5" /></button>
              <button className="hidden md:inline-flex p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10" aria-label="Notificaciones"><IconBell className="h-5 w-5" /></button>
              <button className="hidden md:inline-flex p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10" aria-label="Herramientas"><IconTools className="h-5 w-5" /></button>
              <button
                type="button"
                aria-label="Toggle sidebar"
                onClick={onToggleSidebar}
                className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
              >
                {sidebarOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
