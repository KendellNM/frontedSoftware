import React from "react";
import { Link } from "react-router-dom";
import { IconMenu, IconClose, IconChat, IconBell, IconTools } from "../atoms/Icons";

const Header = ({ sidebarOpen = false, onToggleSidebar = () => {} }) => {

  return (
    <header className="sticky top-0 z-30 w-full shadow-sm">
      <div className="w-full bg-[#0a1024] text-white">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-3 h-14 items-center">
            <div className="flex items-center gap-2 min-w-0">
              <Link to="/" className="flex items-center gap-2 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-white/15 text-white flex items-center justify-center font-bold ring-1 ring-white/20">
                  P
                </div>
                <span className="hidden sm:block text-sm font-semibold truncate">UPeU</span>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <h1 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase">Prácticas pre-profesionales</h1>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button className="hidden md:inline-flex p-2 rounded-md hover:bg-white/10" aria-label="Chat"><IconChat className="h-5 w-5" /></button>
              <button className="hidden md:inline-flex p-2 rounded-md hover:bg-white/10" aria-label="Notificaciones"><IconBell className="h-5 w-5" /></button>
              <button className="hidden md:inline-flex p-2 rounded-md hover:bg-white/10" aria-label="Herramientas"><IconTools className="h-5 w-5" /></button>
              <button
                type="button"
                aria-label="Toggle sidebar"
                onClick={onToggleSidebar}
                className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10"
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
