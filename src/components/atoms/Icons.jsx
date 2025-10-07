import React from "react";

export const IconCalendar = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6.25 4.5A2.25 2.25 0 0 0 4 6.75v10.5A2.25 2.25 0 0 0 6.25 19.5h11.5A2.25 2.25 0 0 0 20 17.25V9l-5.25-4.5H6.25z"/>
    <path d="M14.5 9V4.5L20 9h-5.5z"/>
  </svg>
);

export const IconMail = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1.5 8.25A2.25 2.25 0 0 1 3.75 6h16.5A2.25 2.25 0 0 1 22.5 8.25v7.5A2.25 2.25 0 0 1 20.25 18H3.75A2.25 2.25 0 0 1 1.5 15.75v-7.5zM3 9l9 5.25L21 9"/>
  </svg>
);

export const IconPhone = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.25 3A.75.75 0 0 0 1.5 3.75v16.5a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75H2.25zM3 6h18v12H3V6z"/>
  </svg>
);

export const IconHome = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L18 11.47v6.78A2.75 2.75 0 0 1 15.25 21h-6.5A2.75 2.75 0 0 1 6 18.25v-6.78l-.97.97a.75.75 0 1 1-1.06-1.06l7.5-7.5z"/>
  </svg>
);

export const IconUser = ({ className = "h-3.5 w-3.5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-7 8.25A6.75 6.75 0 0 1 11.75 13.5h.5A6.75 6.75 0 0 1 19 20.25V21H5z"/>
  </svg>
);

export const IconChevronRight = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 5.25a.75.75 0 0 1 1.28-.53l5.25 5.25a.75.75 0 0 1 0 1.06L10.28 16.28A.75.75 0 0 1 9 15.75z"/>
  </svg>
);

export const IconMenu = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const IconClose = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const IconChat = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h6.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-3 4.5l-2.455-.819a4.5 4.5 0 00-2.59 0L10.5 16.5" />
  </svg>
);

export const IconBell = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 18.75a2.25 2.25 0 11-4.5 0m9-6.75a6.75 6.75 0 10-13.5 0c0 2.83-.84 4.18-1.65 5.02a1.35 1.35 0 00.98 2.28h16.34a1.35 1.35 0 00.98-2.28c-.81-.84-1.65-2.19-1.65-5.02z" />
  </svg>
);

export const IconTools = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25l3-3m0 0l3 3m-3-3V15a3 3 0 003 3h1.5m6.75-12l3 3m0 0l-3 3m3-3H15a3 3 0 00-3 3v6.75" />
  </svg>
);
