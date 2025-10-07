import React from "react";

export const TableHeader = ({ children, align = "left", sortable = false, sorted = null, onSort, className = "" }) => {
    const alignClasses = { left: "text-left", center: "text-center", right: "text-right" };
    
    const handleKeyDown = (e) => {
      if (!sortable || typeof onSort !== "function") return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSort(e);
      }
    };

    const ariaSort = sortable
      ? (sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none")
      : undefined;
    return (
      <th 
        scope="col"
        className={`px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50 ${alignClasses[align] || alignClasses.left} ${sortable ? "cursor-pointer hover:bg-gray-100 select-none" : ""} ${className}`}
        onClick={sortable && typeof onSort === "function" ? onSort : undefined}
        tabIndex={sortable ? 0 : undefined}
        onKeyDown={handleKeyDown}
        aria-sort={ariaSort}
      >
        <div className="flex items-center gap-2">
          <span>{children}</span>
          {sortable && (
            <span className="flex flex-col">
              <svg className={`w-3 h-3 ${sorted === "asc" ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" />
              </svg>
              <svg className={`w-3 h-3 -mt-1 ${sorted === "desc" ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" />
              </svg>
            </span>
          )}
        </div>
      </th>
    );
  };
 
 TableHeader.displayName = "TableHeader";
 export default TableHeader;