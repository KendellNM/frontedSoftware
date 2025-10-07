import React from "react";

export const TableCell = ({ children, align = "left", colSpan, rowSpan, className = "" }) => {
    const alignClasses = { left: "text-left", center: "text-center", right: "text-right" };
    return (
      <td className={`px-6 py-4 text-sm text-gray-900 ${alignClasses[align] || alignClasses.left} ${className}`} colSpan={colSpan} rowSpan={rowSpan}>
        {children}
      </td>
    );
  };

TableCell.displayName = "TableCell";
export default TableCell;