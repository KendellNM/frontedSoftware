import React from "react";
import SearchBar from "../molecules/Search";
import Button from "../atoms/Button";
import TableHeader from "../atoms/TableHeader";
import TableCell from "../atoms/TableCell";
import Pagination from "../molecules/Pagination";

export const Table = ({ 
    columns = [],
    data = [],
    loading = false,
    error = null,
    emptyMessage = "No hay datos disponibles",
    pagination = null,
    onPageChange,
    searchable = false,
    searchPlaceholder = "Buscar...",
    onSearch,
    sortable = false,
    sortConfig = { key: null, direction: null },
    onSort,
    showActions = false,
    onAdd,
    addButtonText = "Agregar",
    className = ""
  }) => {
    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      );
    }
  
    return (
      <div className={className}>
        {/* Header con búsqueda y botón agregar */}
        {(searchable || onAdd) && (
          <div className="flex items-center justify-between gap-4 mb-4">
            {searchable && (
              <div className="flex-1 max-w-md">
                <SearchBar onSearch={onSearch} placeholder={searchPlaceholder} />
              </div>
            )}
            {onAdd && (
              <Button onClick={onAdd} variant="primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {addButtonText}
              </Button>
            )}
          </div>
        )}
  
        {/* Tabla */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <TableHeader
                    key={column.key}
                    align={column.align}
                    sortable={sortable && column.sortable !== false}
                    sorted={sortConfig?.key === column.key ? sortConfig.direction : null}
                    onSort={() => onSort && onSort(column.key)}
                  >
                    {column.label}
                  </TableHeader>
                ))}
                {showActions && <TableHeader align="center">Acciones</TableHeader>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <TableCell colSpan={columns.length + (showActions ? 1 : 0)} align="center">
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-500">Cargando...</span>
                    </div>
                  </TableCell>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <TableCell colSpan={columns.length + (showActions ? 1 : 0)} align="center">
                    <div className="py-8">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <p className="text-gray-500">{emptyMessage}</p>
                    </div>
                  </TableCell>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr key={row.id || rowIndex} className="hover:bg-gray-50 transition-colors">
                    {columns.map((column) => (
                      <TableCell key={column.key} align={column.align}>
                        {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell align="center">
                        {row.actions || null}
                      </TableCell>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
  
        {/* Paginación */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
  
        {/* Info de registros */}
        {pagination && data.length > 0 && (
          <div className="mt-2 text-sm text-gray-500 text-center">
            Mostrando {((pagination.currentPage - 1) * pagination.pageSize) + 1} - {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} de {pagination.totalItems} registros
          </div>
        )}
      </div>
    );
  };
 
Table.displayName = "Table";
export default Table;