import React, { useState, useEffect } from "react";
import Input from "../atoms/Input";

export const SearchBar = ({ onSearch, placeholder = "Buscar...", debounceTime = 500, className = "" }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      const timer = setTimeout(() => onSearch(searchTerm), debounceTime);
      return () => clearTimeout(timer);
    }, [searchTerm, debounceTime, onSearch]);
  
    const searchIcon = (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    );
  
    return (
      <div className={`relative ${className}`}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          icon={searchIcon}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  };
  
SearchBar.displayName = "SearchBar";
export default SearchBar;