import React, { useState } from "react";
import Table from "./Table";
import ConfirmDialog from "../molecules/ConfirmDialog";
import TableActions from "../molecules/TableActions";

export const DataTable = ({
    columns = [],
    useDataHook,
    useMutationsHook,
    onAdd,
    onEdit,
    onView,
    showActions = true,
    showEdit = true,
    showDelete = true,
    showView = false,
    entityName = "registro",
    entityNamePlural = "registros",
    addButtonText = "Agregar",
    searchPlaceholder = "Buscar...",
    searchable = true,
    sortable = true,
    toast,
    ...tableProps
  }) => {
    const {
      data,
      pagination,
      isLoading,
      error,
      params,
      handlePageChange,
      handleSearch,
      handleSort
    } = useDataHook();
  
    const mutations = useMutationsHook({
      onDeleteSuccess: () => toast?.success(`${entityName} eliminado correctamente`),
      onDeleteError: (error) => toast?.error(error.message || `Error al eliminar ${entityName}`)
    });
  
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, item: null });
  
    const handleDeleteClick = (item) => setDeleteConfirm({ isOpen: true, item });
  
    const handleDeleteConfirm = async () => {
      try {
        await mutations.delete.mutateAsync(deleteConfirm.item.id);
        setDeleteConfirm({ isOpen: false, item: null });
      } catch (error) {
      }
    };
  
    const handleDeleteCancel = () => setDeleteConfirm({ isOpen: false, item: null });
  
    const dataWithActions = showActions
      ? data.map(item => ({
          ...item,
          actions: (
            <TableActions
              row={item}
              onEdit={onEdit}
              onDelete={handleDeleteClick}
              onView={onView}
              showEdit={showEdit}
              showDelete={showDelete}
              showView={showView}
            />
          )
        }))
      : data;
  
    return (
      <>
        <Table
          columns={columns}
          data={dataWithActions}
          loading={isLoading}
          error={error?.message}
          pagination={pagination}
          onPageChange={handlePageChange}
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          onSearch={handleSearch}
          sortable={sortable}
          sortConfig={params}
          onSort={handleSort}
          showActions={showActions}
          onAdd={onAdd}
          addButtonText={addButtonText}
          emptyMessage={`No se encontraron ${entityNamePlural}`}
          {...tableProps}
        />
  
        <ConfirmDialog
          isOpen={deleteConfirm.isOpen}
          title={`Eliminar ${entityName}`}
          message={`¿Estás seguro de eliminar este ${entityName}? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          variant="danger"
          loading={mutations.delete.isPending}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </>
    );
  };
 
DataTable.displayName = "DataTable";
export default DataTable;